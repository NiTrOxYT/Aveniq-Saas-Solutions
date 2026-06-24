import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface TimelineItem {
  name: string;
  count: number;
}

interface WeeklyIntakeChartProps {
  data: TimelineItem[];
}

export function WeeklyIntakeChart({ data }: WeeklyIntakeChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            stroke="#6b7280" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            dy={8}
          />
          <YAxis 
            stroke="#6b7280" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            allowDecimals={false} 
            dx={-8}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#0e0e11", 
              borderColor: "#1a1a22", 
              borderRadius: "8px",
              fontSize: "11px",
              color: "#ffffff"
            }} 
            itemStyle={{ color: "#10b981" }}
            labelStyle={{ color: "#a1a1aa" }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorCount)" 
            strokeWidth={1.5} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface SourceItem {
  name: string;
  value: number;
}

interface LeadSourcesChartProps {
  data: SourceItem[];
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#6b7280"];

export function LeadSourcesChart({ data }: LeadSourcesChartProps) {
  const validData = data && data.length > 0 ? data : [{ name: "No Inbound", value: 1 }];
  
  return (
    <div className="h-64 w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={validData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {validData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#0e0e11" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#0e0e11",
              borderColor: "#1a1a22",
              borderRadius: "8px",
              fontSize: "11px",
              color: "#ffffff"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center px-4">
        {validData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5 text-[10px] font-mono text-[#a1a1aa]">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }} 
            />
            <span>{entry.name} ({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
