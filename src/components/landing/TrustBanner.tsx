import { useTranslation } from "react-i18next";
import {
  TikTokLogo,
  InstagramLogo,
  YouTubeLogo,
  ShopifyLogo,
  StripeLogo,
  SpotifyLogo,
  MetaLogo,
  TwitterXLogo,
} from "./BrandLogos";

const TrustBanner = () => {
  const { t } = useTranslation();

  const brands = [
    { name: "TikTok", Logo: TikTokLogo },
    { name: "Instagram", Logo: InstagramLogo },
    { name: "YouTube", Logo: YouTubeLogo },
    { name: "Shopify", Logo: ShopifyLogo },
    { name: "Stripe", Logo: StripeLogo },
    { name: "Spotify", Logo: SpotifyLogo },
    { name: "Meta", Logo: MetaLogo },
    { name: "X", Logo: TwitterXLogo },
  ];

  const BrandList = () => (
    <>
      {brands.map((brand, index) => (
        <div
          key={`brand-${index}`}
          className="flex-shrink-0 mx-8 flex items-center justify-center group cursor-pointer"
        >
          <div className="h-12 px-6 flex items-center justify-center text-muted-foreground grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:text-foreground transition-all duration-300">
            <brand.Logo />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <section className="py-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <p className="text-center text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
          {t("trustBanner.title", "Trusted by 100's of companies")}
        </p>
      </div>

      <div className="relative">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-landing-fade to-transparent z-10 pointer-events-none" />

        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-landing-fade to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          <BrandList />
          <BrandList />
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
