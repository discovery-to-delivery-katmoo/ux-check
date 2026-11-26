const colours: Record<string, string> = { todo: "#999", doing: "#f5a623", blocked: "#d0021b", done: "#7ed321" };
export function StatusDot({ status }: { status: string }) {
  return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 5, background: colours[status] }} />;
}
