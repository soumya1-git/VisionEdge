import React, { useMemo } from "react";

export type StreamActivity = {
  id: string;
  streamName: string;
  event: "STARTED" | "STOPPED" | "INCIDENT" | "RECOVERED" | "ERROR";
  message?: string;
  timestamp: Date;
};

interface StreamActivityLogProps {
  activities: StreamActivity[];
  maxItems?: number;
}

const EVENT_LABELS: Record<StreamActivity["event"], string> = {
  STARTED: "Stream Started",
  STOPPED: "Stream Stopped",
  INCIDENT: "Incident Detected",
  RECOVERED: "Stream Recovered",
  ERROR: "Stream Error",
};

const EVENT_SYMBOLS: Record<StreamActivity["event"], string> = {
  STARTED: "▶",
  STOPPED: "■",
  INCIDENT: "!",
  RECOVERED: "✓",
  ERROR: "×",
};

export default function StreamActivityLog({
  activities,
  maxItems = 10,
}: StreamActivityLogProps) {
  const recentActivities = useMemo(
    () =>
      [...activities]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime()
        )
        .slice(0, maxItems),
    [activities, maxItems]
  );

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="w-full rounded-lg border border-slate-700 bg-slate-900/80 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Stream Activity
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Recent stream events and system activity
          </p>
        </div>

        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400">
          {recentActivities.length} events
        </span>
      </div>

      {recentActivities.length === 0 ? (
        <div className="flex min-h-24 items-center justify-center rounded-md border border-dashed border-slate-700 text-sm text-slate-500">
          No stream activity recorded
        </div>
      ) : (
        <div className="space-y-2">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-md border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300">
                {EVENT_SYMBOLS[activity.event]}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-slate-200">
                    {EVENT_LABELS[activity.event]}
                  </p>

                  <time className="shrink-0 text-xs text-slate-500">
                    {formatTime(activity.timestamp)}
                  </time>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.streamName}
                </p>

                {activity.message && (
                  <p className="mt-1 text-xs text-slate-500">
                    {activity.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
