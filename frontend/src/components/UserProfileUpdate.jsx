import { IoSaveOutline } from "react-icons/io5";
import { Button } from "./ui/Button";

export default function UserProfileUpdateWithQR() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Profile updated:", userData);
    alert("Profile update successfully");
  };

  return (
    <div className="mt-8 bg-transparent">
      <div className="px-4 mx-auto space-y-8 max-w-screen-2xl">
        <div className="overflow-hidden border rounded-md shadow border-zinc-300 dark:border-zinc-800 bg-neutral-100 dark:bg-transparent sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-3xl font-semibold leading-6 text-gray-900 dark:text-white">
              General
            </h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
              Modify your personal information:
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block font-medium text-gray-700 dark:text-neutral-200"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="your name here.."
                    autoComplete="given-name"
                    className="px-4 py-[5px] w-full lg:w-[800px] mt-1 bg-transparent border border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block font-medium text-gray-700 dark:text-neutral-300"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="your lastname here..."
                    autoComplete="family-name"
                    className="px-4 py-[5px] w-full lg:w-[800px] mt-1 bg-transparent border border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700 dark:text-neutral-300"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="& your email here..."
                    autoComplete="email"
                    className="px-4 py-[5px] w-full lg:w-[800px] mt-1 bg-transparent border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-8">
                <Button
                  variant="neutral900"
                  type="submit"
                  className="inline-flex items-center justify-center gap-1 w-full text-[15px] px-2 py-2 text-white rounded-md transition ease-in-out md:w-48 lg:w-48"
                >
                  <IoSaveOutline />
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="px-5 py-5 border border-gray-300 rounded-md shadow dark:border-zinc-800">
          <div>
            <h2 className="text-3xl font-semibold">Account</h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
              Update your account settings:
            </p>
          </div>

          <div className="w-full gap-2 mt-8">
            <h4>Delete account:</h4>
            <Button
              className="inline-flex items-center justify-center w-full gap-2 py-2 mx-0 mt-2 text-white md:w-48 lg:w-48"
              variant="danger"
            >
              Delete account
              <img className="size-5" src="/delete.svg" alt="delete icon" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
