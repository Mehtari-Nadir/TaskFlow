import { ModeToggle } from "../Toggle";
import { Separator } from "@/components/ui/separator";

const SettingsHeader = () => (
  <header>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-4 sm:py-8 lg:px-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <div>
            <h1 className="text-2xl font-bold  sm:text-3xl">Settings</h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Change your account settings
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <div className="inline-flex items-center justify-center gap-1.5">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
    <Separator />
  </header>
);

export default SettingsHeader;
