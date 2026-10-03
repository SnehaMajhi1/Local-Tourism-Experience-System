import {
  Compass,
  Mail,
  ArrowRight,
  MapPin,
  Phone,
  MailIcon,
} from "lucide-react";


const linkColumns =[
    {
        title:"EXPLORE",
        links: [
            { label: "Cultural", href: "#" },
            { label: "Food & Cooking", href: "#" },
            { label: "Adventure", href: "#" },
            { label: "Farming", href: "#" },
            { label: "Homestay", href: "#" },

        ],
    },

     {
        title:"COMPANY",
        links: [
            { label: "About Us", href: "#" },
            { label: "Our hosts", href: "#" },
            { label: "Become a host", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },


     {
        title:"CONTACT",
        links: [
            { label: "Jhamsikhel, Lalitpur, Nepal", href: "#", Icon: MapPin, },
            { label: "+977 1568564357", href: "#", Icon: Phone, },
            { label: "hello@localtourism.np", href: "#", Icon: MailIcon},
            { label: "", href: "#" },
        ],
    },

];



export default function Footer() {
    return(
        <footer className="border-t border-emerald-700 bg-emerald-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">

            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground">
                LOCAL TOURISM
              </span>
               </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A community-based marketplace where Nepali hosts sell authentic experience directly to travellers-no middlemen, no packaged tours.
            </p>

            {/* Newsletter */}
            <form className="mt-6 flex max-w-sm items-center gap-2">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                aria-label="Subscribe"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">



                  {col.links.map((link) => {
  const Icon = link.Icon;

  return (
    <li key={link.label}>
      <a
        href={link.href}
        className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {Icon && <Icon className="h-5 w-5 shrink-0" />}
        <span>{link.label}</span>
      </a>
    </li>
  );
})}


                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Local Tourism Experience Marketplace. All rights reserved. 
          </p>

         <p className="text-sm text-muted-foreground">Built with local communities across Nepal</p>
        </div>
      </div>




        </footer>
    );
}