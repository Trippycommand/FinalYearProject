export default function Footer() {
  const footMenu = ['Feature', 'Integration', 'Pricing', 'FAQ ']
  const footMenu2 = ['Privacy', 'Terms and condition']
  return (
    <footer className="divide-y border-t border-neutral-800 bg-gray-900 px-4 text-gray-100">
      <div className="container mx-auto flex flex-col justify-between space-y-8 py-10 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-400">
              {/* <Logo /> */}
            </div>
            <span className="self-center text-2xl font-semibold text-gray-50">
              Crypto Scout
            </span>
          </a>
        </div>
        <div className=" grid-col-2 grid gap-x-3 gap-y-8 text-sm sm:grid-cols-4 lg:w-2/3">
          <div className="space-y-3">
            <h3 className="tracki uppercase text-[#7765F3]">Product</h3>
            <ul className="space-y-1 text-gray-50">
              {footMenu.map((menu, i) => (
                <li key={i + 1}>
                  <a rel="noopener noreferrer" href="#">
                    {menu}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="tracki uppercase text-[#7765F3]">Company</h3>
            <ul className="space-y-1 text-gray-50">
              {['Privacy', ' Terms of Service'].map((menu, i) => (
                <li key={i + 1}>
                  <a rel="noopener noreferrer" href="#">
                    {menu}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase text-[#7765F3]">Developers</h3>
            <ul className="space-y-1 text-gray-50">
              {['Public API', 'Documentation', 'Guides'].map((menu, i) => (
                <li key={i + 1}>
                  <a rel="noopener noreferrer" href="#">
                    {menu}
                  </a>
                </li>
              ))}
            </ul>
          </div>

    
        </div>
      </div>

      <div className="border-t-[3px] border-[#7765F3] py-6 text-center text-sm text-gray-400">
        © 2024 @cryptoscout Co. All rights reserved.
      </div>
    </footer>
  )
}
