import { Phone, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { getHeaderFooterData } from "@/lib/db";

interface HeaderFooterData {
  headerPhone: string;
  headerEmail: string;
  websiteName: string;
  website: string;
  logo: string;
}

export default async function Header() {
  const headerData: HeaderFooterData = await getHeaderFooterData();

  if (!headerData) return null;

  return (
    <>
      <div className="bg-primary text-primary-foreground overflow-x-auto">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs md:text-sm gap-2 md:gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4 w-full md:w-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <Phone size={14} />
              <span className="truncate">{headerData.headerPhone}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Mail size={14} />
              <span className="truncate">{headerData.headerEmail}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Globe size={14} />
            <span className="hidden sm:inline">Exporting Worldwide</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {headerData.logo ? (
              <img
                src={headerData.logo || "/placeholder.svg"}
                alt={headerData.websiteName}
                className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 md:w-10 h-8 md:h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs md:text-base">
                {headerData.websiteName.charAt(0)}
              </div>
            )}
            <div className="hidden sm:block">
              <h1 className="font-bold text-xs md:text-lg leading-tight">
                {headerData.websiteName}
              </h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                Premium Agricultural Products
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 md:gap-8">
            <a
              href="/about"
              className="text-foreground hover:text-primary transition font-medium text-sm"
            >
              About
            </a>
            <a
              href="#products"
              className="text-foreground hover:text-primary transition font-medium text-sm"
            >
              Products
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition font-medium text-sm"
            >
              Contact
            </a>
            <Link
              href="/agritechimentoradmin"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition text-sm font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
