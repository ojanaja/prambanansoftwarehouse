import Navbar from "@/components/navigation/Navbar";

export default function Template({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar disabledScroll={true} />
      <div className="mt-10">{children}</div>
    </div>
  );
}
