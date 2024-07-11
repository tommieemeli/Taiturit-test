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
    label: "Selaa ilmoituksia",
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

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
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
