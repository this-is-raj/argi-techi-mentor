// MongoDB API client - replaces localStorage with API calls
interface HeroData {
  title: string;
  subtitle: string;
  cta_text: string;
  image: string;
}
export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image?: File | null;
  botanicalName: string;
  form: string;
  packaging: string;
  origin: string;
  gallery?: File[];
  specifications: Record<string, string>;
  description: string;
  benefits: string;
  details: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface ContactData {
  email: string;
  phone: string;
  address: string;
  website: string;
}

interface AboutData {
  title: string;
  description: string;
  mission: string;
  vision: string;
}

interface HeaderFooterData {
  headerPhone: string;
  headerEmail: string;
  websiteName: string;
  footerDescription: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  website: string;
  logo: string;
}

export async function getHeroData(): Promise<HeroData> {
  try {
    const response = await fetch(`${process.env.APP_HOST}/api/hero`, {
      cache: "no-store",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching hero data:", error);
  }
  return {
    title: "Premium Agricultural Exports from India",
    subtitle:
      "Delivering quality spices, pulses, and fresh produce to 50+ countries worldwide",
    cta_text: "Get Started",
    image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${process.env.APP_HOST}/api/products`, {
      cache: "no-store",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return [];
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${process.env.APP_HOST}/api/products?id=${id}`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
  return null;
}

export async function getContactData(): Promise<ContactData> {
  try {
    const response = await fetch(`${process.env.APP_HOST}/api/contact`, {
      cache: "no-store",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
  return {
    email: "info@agritechimentor.com",
    phone: "+91-9549235277",
    address: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
    website: "www.agritechimentor.com",
  };
}

export async function getAboutData(): Promise<AboutData> {
  try {
    const response = await fetch(`${process.env.APP_HOST}/api/about`, {
      cache: "no-store",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
  }
  return {
    title: "About Agro TechieMentor",
    description:
      "We are a leading exporter of premium agricultural products from India, committed to quality and sustainability.",
    mission:
      "To provide the highest quality agricultural products to global markets",
    vision: "To be the most trusted agricultural export company in the world",
  };
}

export async function updateHeroData(data: HeroData) {
  try {
    await fetch(`${process.env.APP_HOST}/api/hero`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error updating hero data:", error);
  }
}

export async function updateProducts(data: Product[]) {
  try {
    for (const product of data) {
      await fetch(`${process.env.APP_HOST}/api/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    }
  } catch (error) {
    console.error("Error updating products:", error);
  }
}

export async function updateContactData(data: ContactData) {
  try {
    await fetch(`${process.env.APP_HOST}/api/contact`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error updating contact data:", error);
  }
}

export async function updateAboutData(data: AboutData) {
  try {
    await fetch(`${process.env.APP_HOST}/api/about`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error updating about data:", error);
  }
}

export async function addProduct(product: Omit<Product, "id">) {
  try {
    const response = await fetch(`${process.env.APP_HOST}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
  return null;
}

export async function deleteProduct(id: string) {
  try {
    await fetch(`${process.env.APP_HOST}/api/products?id=${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

export async function getHeaderFooterData(): Promise<HeaderFooterData> {
  try {
    const response = await fetch(`${process.env.APP_HOST}/api/header-footer`, {
      cache: "no-store",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching header/footer data:", error);
  }
  return {
    headerPhone: "+91 9549235277",
    headerEmail: "techiementor.co@gmail.com",
    websiteName: "Agro TechieMentor",
    footerDescription:
      "Leading exporter of premium agricultural products from India to global markets.",
    footerAddress: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
    footerPhone: "+91 9549235277",
    footerEmail: "techiementor.co@gmail.com",
    website: "www.agritechimentor.com",
    logo: "/placeholder-logo.png",
  };
}

export async function updateHeaderFooterData(data: HeaderFooterData) {
  try {
    await fetch(`${process.env.APP_HOST}/api/header-footer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error updating header/footer data:", error);
  }
}

export async function updateProduct(id: string, product: Product) {
  try {
    await fetch(`${process.env.APP_HOST}/api/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, id }),
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
}
