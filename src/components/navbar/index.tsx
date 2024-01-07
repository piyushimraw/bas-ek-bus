import { Disclosure, Menu } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
// eslint-disable-next-line react-refresh/only-export-components
export const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Seats View', href: '/seats' },
];

function Navbar() {
  return (
    <Disclosure as="nav" className="border-b border-gray-200 bg-white">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      activeOptions={{
                        exact: true,
                      }}
                      activeProps={{
                        className:
                          'border-indigo-500 text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                        'aria-current': 'page',
                      }}
                      inactiveProps={{
                        className:
                          'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                      }}
                      params={{}}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
