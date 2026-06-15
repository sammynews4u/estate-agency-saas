import type { SVGProps } from 'react';

export type LucideIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

function IconBase(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

export const Activity: LucideIcon = (props) => <IconBase {...props} />;
export const AlertCircle: LucideIcon = (props) => <IconBase {...props} />;
export const AlertTriangle: LucideIcon = (props) => <IconBase {...props} />;
export const ArrowRight: LucideIcon = (props) => <IconBase {...props} />;
export const ArrowUpRight: LucideIcon = (props) => <IconBase {...props} />;
export const BadgeCheck: LucideIcon = (props) => <IconBase {...props} />;
export const Banknote: LucideIcon = (props) => <IconBase {...props} />;
export const BarChart3: LucideIcon = (props) => <IconBase {...props} />;
export const Bath: LucideIcon = (props) => <IconBase {...props} />;
export const BedDouble: LucideIcon = (props) => <IconBase {...props} />;
export const Bell: LucideIcon = (props) => <IconBase {...props} />;
export const BellRing: LucideIcon = (props) => <IconBase {...props} />;
export const BrainCircuit: LucideIcon = (props) => <IconBase {...props} />;
export const BriefcaseBusiness: LucideIcon = (props) => <IconBase {...props} />;
export const Building2: LucideIcon = (props) => <IconBase {...props} />;
export const Calculator: LucideIcon = (props) => <IconBase {...props} />;
export const CalendarCheck: LucideIcon = (props) => <IconBase {...props} />;
export const CalendarCheck2: LucideIcon = (props) => <IconBase {...props} />;
export const CalendarClock: LucideIcon = (props) => <IconBase {...props} />;
export const CalendarDays: LucideIcon = (props) => <IconBase {...props} />;
export const Camera: LucideIcon = (props) => <IconBase {...props} />;
export const Car: LucideIcon = (props) => <IconBase {...props} />;
export const CheckCircle2: LucideIcon = (props) => <IconBase {...props} />;
export const ChevronRight: LucideIcon = (props) => <IconBase {...props} />;
export const CircleDollarSign: LucideIcon = (props) => <IconBase {...props} />;
export const ClipboardCheck: LucideIcon = (props) => <IconBase {...props} />;
export const ClipboardList: LucideIcon = (props) => <IconBase {...props} />;
export const Clock3: LucideIcon = (props) => <IconBase {...props} />;
export const Coins: LucideIcon = (props) => <IconBase {...props} />;
export const Copy: LucideIcon = (props) => <IconBase {...props} />;
export const DatabaseZap: LucideIcon = (props) => <IconBase {...props} />;
export const Download: LucideIcon = (props) => <IconBase {...props} />;
export const Eye: LucideIcon = (props) => <IconBase {...props} />;
export const FileArchive: LucideIcon = (props) => <IconBase {...props} />;
export const FileCheck2: LucideIcon = (props) => <IconBase {...props} />;
export const FileClock: LucideIcon = (props) => <IconBase {...props} />;
export const FileInput: LucideIcon = (props) => <IconBase {...props} />;
export const FilePlus2: LucideIcon = (props) => <IconBase {...props} />;
export const FileSpreadsheet: LucideIcon = (props) => <IconBase {...props} />;
export const FileText: LucideIcon = (props) => <IconBase {...props} />;
export const FileWarning: LucideIcon = (props) => <IconBase {...props} />;
export const Filter: LucideIcon = (props) => <IconBase {...props} />;
export const FolderKanban: LucideIcon = (props) => <IconBase {...props} />;
export const Gauge: LucideIcon = (props) => <IconBase {...props} />;
export const GitBranch: LucideIcon = (props) => <IconBase {...props} />;
export const HandCoins: LucideIcon = (props) => <IconBase {...props} />;
export const Handshake: LucideIcon = (props) => <IconBase {...props} />;
export const HardHat: LucideIcon = (props) => <IconBase {...props} />;
export const Heart: LucideIcon = (props) => <IconBase {...props} />;
export const Home: LucideIcon = (props) => <IconBase {...props} />;
export const Inbox: LucideIcon = (props) => <IconBase {...props} />;
export const Landmark: LucideIcon = (props) => <IconBase {...props} />;
export const LayoutDashboard: LucideIcon = (props) => <IconBase {...props} />;
export const LifeBuoy: LucideIcon = (props) => <IconBase {...props} />;
export const LineChart: LucideIcon = (props) => <IconBase {...props} />;
export const LockKeyhole: LucideIcon = (props) => <IconBase {...props} />;
export const MapPin: LucideIcon = (props) => <IconBase {...props} />;
export const Megaphone: LucideIcon = (props) => <IconBase {...props} />;
export const Menu: LucideIcon = (props) => <IconBase {...props} />;
export const MessageCircle: LucideIcon = (props) => <IconBase {...props} />;
export const MessageSquarePlus: LucideIcon = (props) => <IconBase {...props} />;
export const MessageSquareQuote: LucideIcon = (props) => <IconBase {...props} />;
export const MessageSquareText: LucideIcon = (props) => <IconBase {...props} />;
export const Network: LucideIcon = (props) => <IconBase {...props} />;
export const PieChart: LucideIcon = (props) => <IconBase {...props} />;
export const Plus: LucideIcon = (props) => <IconBase {...props} />;
export const PlusCircle: LucideIcon = (props) => <IconBase {...props} />;
export const Printer: LucideIcon = (props) => <IconBase {...props} />;
export const ReceiptText: LucideIcon = (props) => <IconBase {...props} />;
export const RotateCcw: LucideIcon = (props) => <IconBase {...props} />;
export const Ruler: LucideIcon = (props) => <IconBase {...props} />;
export const Save: LucideIcon = (props) => <IconBase {...props} />;
export const Search: LucideIcon = (props) => <IconBase {...props} />;
export const SearchCheck: LucideIcon = (props) => <IconBase {...props} />;
export const Send: LucideIcon = (props) => <IconBase {...props} />;
export const Settings: LucideIcon = (props) => <IconBase {...props} />;
export const Shield: LucideIcon = (props) => <IconBase {...props} />;
export const ShieldAlert: LucideIcon = (props) => <IconBase {...props} />;
export const ShieldCheck: LucideIcon = (props) => <IconBase {...props} />;
export const Sparkles: LucideIcon = (props) => <IconBase {...props} />;
export const Star: LucideIcon = (props) => <IconBase {...props} />;
export const Store: LucideIcon = (props) => <IconBase {...props} />;
export const Target: LucideIcon = (props) => <IconBase {...props} />;
export const TicketCheck: LucideIcon = (props) => <IconBase {...props} />;
export const TimerReset: LucideIcon = (props) => <IconBase {...props} />;
export const TrendingDown: LucideIcon = (props) => <IconBase {...props} />;
export const TrendingUp: LucideIcon = (props) => <IconBase {...props} />;
export const Trash2: LucideIcon = (props) => <IconBase {...props} />;
export const TriangleAlert: LucideIcon = (props) => <IconBase {...props} />;
export const UploadCloud: LucideIcon = (props) => <IconBase {...props} />;
export const UserCheck: LucideIcon = (props) => <IconBase {...props} />;
export const UserCog: LucideIcon = (props) => <IconBase {...props} />;
export const UserPlus: LucideIcon = (props) => <IconBase {...props} />;
export const UserRound: LucideIcon = (props) => <IconBase {...props} />;
export const UsersRound: LucideIcon = (props) => <IconBase {...props} />;
export const Wallet: LucideIcon = (props) => <IconBase {...props} />;
export const WalletCards: LucideIcon = (props) => <IconBase {...props} />;
export const WandSparkles: LucideIcon = (props) => <IconBase {...props} />;
export const Wrench: LucideIcon = (props) => <IconBase {...props} />;
export const X: LucideIcon = (props) => <IconBase {...props} />;
