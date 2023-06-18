import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../../public/Logo.png";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import Nav from "../Nav/Nav"
const navigation = [
  { name: "Dashboard", href: "/", icon: DashboardSharpIcon, current: true },
  { name: "Class", href: "/classes", icon: UsersIcon, current: false },
  { name: "Students", href: "/students", icon: FolderIcon, current: false },
  { name: "Teachers", href: "/teachers", icon: CalendarIcon, current: false },
  { name: "Payment", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "/profile", icon: ChartPieIcon, current: false },
];
const Actions = [
  {
    id: 1,
    name: "Student Registration",
    href: "#",
    initial: "F",
    current: false,
  },
  {
    id: 2,
    name: "Teacher Registration",
    href: "/teachers/registration",
    initial: "F",
    current: false,
  },
  { id: 3, name: "Non Teaching Staff", href: "/employee", initial: "F", current: false },
  { id: 4, name: "Fee Register", href: "#", initial: "A", current: false },
];
import Image from "next/image";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import SignIn from '../..//components/Auth/Login';
import Register from '../..//components/Auth/Register';
import Link from "next/link";

import { useRouter } from "next/router";
import StudentForm from "@/pages/students/StudentForm";
// import your other components here

export default function Dashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  let content;

  switch (router.pathname) {
    case "/students":
      content = <StudentForm />;
      break;
    // Add more cases here for other routes
    default:
      content = children;
  }

  return (
    <>
     
      <div>
        <div></div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-100 px-6 pb-2 ring-1 ring-white/10">
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Actions
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link href={item.href}>
                                  <a
                                    className={classNames(
                                      router.pathname === item.href
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      className="h-6 w-6 shrink-0"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6">
            <div className="flex items-center justify-center my-5 p-5">
              <Image src={Logo} width={100} height={100} alt="logo" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 shadow-md -tracking-wide shadow-black text-gray-100"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-regular"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name} 
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Action
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {Actions.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-50 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            Dashboard++
          </div>
        </div>
{/* area taking up space before main */}
        {/* <main className="py-10 lg:pl-72"> */}
        <main className=" lg:pl-72">
     {/*    <Register/>
        {/* <SignIn/> */}
        <Nav className=""/>
          <div className="px-4 sm:px-6 lg:px-8"> {content}</div>
        </main>
      </div>
    </>
  );
}



import { Disclosure, Menu,  } from '@headlessui/react'
import {  BellIcon,  } from '@heroicons/react/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navi = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]



// const Example=() =>{
//   return (
//     <>
//       {/*
//         This example requires updating your template:

//         ```
//         <html class="h-full bg-gray-100">
//         <body class="h-full">
//         ```
//       */}
//       <div className="min-h-full">
//         <div className="bg-gray-400 pb-32">
//           <Disclosure as="nav" className="bg-gray-400">
//             {({ open }) => (
//               <>
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                   <div className="border-b border-gray-700">
//                     <div className="flex h-16 items-center justify-between px-4 sm:px-0">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                           <img
//                             className="h-8 w-8"
//                             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                             alt="Your Company"
//                           />
//                         </div>
//                         <div className="hidden md:block">
//                           <div className="ml-10 flex items-baseline space-x-4">
//                             {navigation.map((item) => (
//                               <a
//                                 key={item.name}
//                                 href={item.href}
//                                 className={classNames(
//                                   item.current
//                                     ? 'bg-gray-900 text-white'
//                                     : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                   'rounded-md px-3 py-2 text-sm font-medium'
//                                 )}
//                                 aria-current={item.current ? 'page' : undefined}
//                               >
//                                 {item.name}
//                               </a>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="hidden md:block">
//                         <div className="ml-4 flex items-center md:ml-6">
//                           <button
//                             type="button"
//                             className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                           >
//                             <span className="sr-only">View notifications</span>
//                             <BellIcon className="h-6 w-6" aria-hidden="true" />
//                           </button>

//                           {/* Profile dropdown */}
//                           <Menu as="div" className="relative ml-3">
//                             <div>
//                               <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                                 <span className="sr-only">Open user menu</span>
//                                 <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
//                               </Menu.Button>
//                             </div>
//                             <Transition
//                               as={Fragment}
//                               enter="transition ease-out duration-100"
//                               enterFrom="transform opacity-0 scale-95"
//                               enterTo="transform opacity-100 scale-100"
//                               leave="transition ease-in duration-75"
//                               leaveFrom="transform opacity-100 scale-100"
//                               leaveTo="transform opacity-0 scale-95"
//                             >
//                               <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                 {userNavigation.map((item) => (
//                                   <Menu.Item key={item.name}>
//                                     {({ active }) => (
//                                       <a
//                                         href={item.href}
//                                         className={classNames(
//                                           active ? 'bg-gray-100' : '',
//                                           'block px-4 py-2 text-sm text-gray-700'
//                                         )}
//                                       >
//                                         {item.name}
//                                       </a>
//                                     )}
//                                   </Menu.Item>
//                                 ))}
//                               </Menu.Items>
//                             </Transition>
//                           </Menu>
//                         </div>
//                       </div>
//                       <div className="-mr-2 flex md:hidden">
//                         {/* Mobile menu button */}
//                         <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                           <span className="sr-only">Open main menu</span>
//                           {open ? (
//                             <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                           ) : (
//                             <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                           )}
//                         </Disclosure.Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <Disclosure.Panel className="border-b border-gray-700 md:hidden">
//                   <div className="space-y-1 px-2 py-3 sm:px-3">
//                     {navigation.map((item) => (
//                       <Disclosure.Button
//                         key={item.name}
//                         as="a"
//                         href={item.href}
//                         className={classNames(
//                           item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                           'block rounded-md px-3 py-2 text-base font-medium'
//                         )}
//                         aria-current={item.current ? 'page' : undefined}
//                       >
//                         {item.name}
//                       </Disclosure.Button>
//                     ))}
//                   </div>
//                   <div className="border-t border-gray-700 pb-3 pt-4">
//                     <div className="flex items-center px-5">
//                       <div className="flex-shrink-0">
//                         <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
//                       </div>
//                       <div className="ml-3">
//                         <div className="text-base font-medium leading-none text-white">{user.name}</div>
//                         <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
//                       </div>
//                       <button
//                         type="button"
//                         className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                       >
//                         <span className="sr-only">View notifications</span>
//                         <BellIcon className="h-6 w-6" aria-hidden="true" />
//                       </button>
//                     </div>
//                     <div className="mt-3 space-y-1 px-2">
//                       {userNavigation.map((item) => (
//                         <Disclosure.Button
//                           key={item.name}
//                           as="a"
//                           href={item.href}
//                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
//                         >
//                           {item.name}
//                         </Disclosure.Button>
//                       ))}
//                     </div>
//                   </div>
//                 </Disclosure.Panel>
//               </>
//             )}
//           </Disclosure>
//           <header className="py-10">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
//             </div>
//           </header>
//         </div>


//         <main className="-mt-32 bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-600">
//           <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{/* Your content */}</div>
//         </main>
//         <div style={{position:"sticky",bottom:"0"}}>
//         <CopyRight/>
//         </div>
//       </div>
//     </>
//   )
// }

import CopyRight from "../Footer/CopyRight";