export const navLinks = [
  {
    label: "Etusivu",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Lisää ilmoitus",
    route: "/ilmoitus/add",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Selaa työtarjouksia",
    route: "/posts",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Selaa taitureita",
    route: "/taiturit",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Profiili",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Tilaukset",
    route: "/subscription",
    icon: "/assets/icons/bag.svg",
  },
];

export const postTypes = {
  addJobListing: {
    title: "Lisää työtarjous",
    subTitle: "Tarjoa työtä taiturille",
  },
  addOfferListing: {
    title: "Lisää työhaku ilmoitus",
    subTitle: "Tarjoa osaamistasi yrityksille",
  },
};

export enum PostType {
  jobPosting = 1,
  jobSeeking = 2,
}

export const postTypeOptions = {
  tyonhaku: {
    type: PostType.jobPosting,
    label: "Työnhaku ilmoitus",
  },
  tyotarjous: {
    type: PostType.jobSeeking,
    label: "Työtarjous ilmoitus",
  },
};

export const creditFee = -1;
