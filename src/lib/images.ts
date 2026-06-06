/** Local images — served from /public */
export const IMAGES = {
  hero: "/images/hero/dal-makhani-hero.png",
  og: "/og.png",
  butterChicken: "/images/dishes/butter-chicken.png",
  dalMakhani: "/images/dishes/dal-makhani.png",
  seekhKebab: "/images/dishes/seekh-kebab.png",
  /** Drop your file at public/images/chef/chef.png */
  chef: "/images/chef/chef.png",
} as const;

export const MENU_IMAGES = {
  curries: {
    roganJosh: "/images/menu/curries/rogan-josh.png",
    paneerTikkaMasala: "/images/menu/curries/paneer-tikka-masala.png",
    chettinadPrawn: "/images/menu/curries/chettinad-prawn.png",
    dalMakhani: "/images/menu/curries/dal-makhani.png",
    butterChicken: "/images/menu/curries/butter-chicken.png",
    palakPaneer: "/images/menu/curries/palak-paneer.png",
  },
  starters: {
    galoutiKebab: "/images/menu/starters/galouti-kebab.png",
    seekhKebab: "/images/menu/starters/seekh-kebab.png",
    paneerTikka: "/images/menu/starters/paneer-tikka.png",
    samosaChaat: "/images/menu/starters/samosa-chaat.png",
    tandooriChicken: "/images/menu/starters/tandoori-chicken.png",
    pavBhaji: "/images/menu/starters/pav-bhaji.png",
  },
  breads: {
    garlicNaan: "/images/menu/breads/garlic-naan.png",
    butterNaan: "/images/menu/breads/butter-naan.png",
    lacchaParatha: "/images/menu/breads/laccha-paratha.png",
    cheeseNaan: "/images/menu/breads/cheese-naan.png",
    roomaliRoti: "/images/menu/breads/roomali-roti.png",
    alooParatha: "/images/menu/breads/aloo-paratha.png",
  },
  biryani: {
    hyderabadi: "/images/menu/biryani/hyderabadi-biryani.png",
    lucknowi: "/images/menu/biryani/lucknowi-biryani.png",
    chicken: "/images/menu/biryani/chicken-biryani.png",
    veg: "/images/menu/biryani/veg-biryani.png",
    egg: "/images/menu/biryani/egg-biryani.png",
    prawn: "/images/menu/biryani/prawn-biryani.png",
  },
  desserts: {
    gulabJamun: "/images/menu/desserts/gulab-jamun.png",
    rasmalai: "/images/menu/desserts/rasmalai.png",
    kheer: "/images/menu/desserts/kheer.png",
    kulfi: "/images/menu/desserts/kulfi.png",
    jalebi: "/images/menu/desserts/jalebi.png",
    gajarHalwa: "/images/menu/desserts/gajar-halwa.png",
  },
} as const;
