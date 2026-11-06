import { useState, useEffect } from 'react';
import { dashboardAPI } from '../api';
import { Card, PageLoader, Badge } from '../components/ui';
import { Calendar as CalendarIcon, Flame, Award, Zap, Activity } from 'lucide-react';
import { format, subDays, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import toast from 'react-hot-toast';

export default function CalendarPage() {
  const [calendarData, setCalendarData] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [calRes, actRes] = await Promise.all([
          dashboardAPI.getCalendar(365),
          dashboardAPI.getActivities(25),
        ]);
        setCalendarData(calRes.data || {});
        setActivities(actRes.data || []);
      } catch (err) {
        toast.error('Failed to load activity calendar');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute days for past 52 weeks
  const today = new Date();
  const startDate = subDays(today, 364);
  const allDays = eachDayOfInterval({ start: startDate, end: today });

  // Calculate streaks and metrics
  let totalActivities = 0;
  let activeDays = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  allDays.forEach((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const count = calendarData[dateStr] || 0;
    if (count > 0) {
      totalActivities += count;
      activeDays++;
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  });

  // Calculate current streak starting backwards from today
  for (let i = allDays.length - 1; i >= 0; i--) {
    const dateStr = format(allDays[i], 'yyyy-MM-dd');
    if ((calendarData[dateStr] || 0) > 0) {
      currentStreak++;
    } else if (i === allDays.length - 1) {
      // If no activity today, check if yesterday had activity
      continue;
    } else {
      break;
    }
  }

  const getColorClass = (count) => {
    if (!count || count === 0) return 'bg-slate-100 dark:bg-slate-800 text-transparent';
    if (count === 1) return 'bg-emerald-200 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700';
    if (count <= 3) return 'bg-emerald-400 dark:bg-emerald-700 border border-emerald-500';
    if (count <= 5) return 'bg-emerald-500 dark:bg-emerald-600 text-white';
    return 'bg-emerald-600 dark:bg-emerald-500 text-white';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Heatmap</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Real recorded developer contributions inside DevTrack over the past 365 days
        </p>
      </div>

      {/* Streak cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentStreak} days</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current Streak</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{longestStreak} days</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Longest Streak</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalActivities}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Activities</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{activeDays} days</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active Days</p>
          </div>
        </Card>
      </div>

      {/* Contribution Calendar Grid */}
      <Card className="p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            {totalActivities} contributions in the last year
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Less</span>
            <span className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800 inline-block" />
            <span className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900/60 inline-block" />
            <span className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-700 inline-block" />
            <span className="w-3 h-3 rounded-sm bg-emerald-600 dark:bg-emerald-500 inline-block" />
            <span>More</span>
          </div>
        </div>

        {loading ? (
          <PageLoader />
        ) : (
          <div className="overflow-x-auto pb-2">
            <div
              className="grid grid-rows-7 grid-flow-col gap-1 w-max"
              style={{ minWidth: '780px' }}
            >
              {allDays.map((day) => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const count = calendarData[dateStr] || 0;

                return (
                  <div
                    key={dateStr}
                    onMouseEnter={() => setHoveredDay({ dateStr, count })}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3.5 h-3.5 rounded-sm cursor-pointer transition-transform hover:scale-125 ${getColorClass(
                      count
                    )}`}
                    title={`${count} activities on ${format(day, 'MMM d, yyyy')}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Hover info pill */}
        <div className="min-h-[24px] mt-2 text-xs text-slate-600 dark:text-slate-400">
          {hoveredDay ? (
            <span>
              <strong>{hoveredDay.count}</strong> contributions on {hoveredDay.dateStr}
            </span>
          ) : (
            <span className="text-slate-400">Hover over any day square for details</span>
          )}
        </div>
      </Card>

      {/* Activity Timeline List */}
      <Card className="p-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Detailed Activity Stream</h2>
        {activities.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No recorded activity history yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {activities.map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{act.description}</p>
                    <p className="text-xs text-slate-400">{act.activityDate}</p>
                  </div>
                </div>
                <Badge variant="default">{act.activityType.replace(/_/g, ' ')}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
