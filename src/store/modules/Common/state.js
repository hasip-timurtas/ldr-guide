export default {
  btcPrice: null,
  dialogs: {
    generalDialog: false,
    dialogType: "success", // this is for dialog message // success or error or info
    dialogMessage: "",
    addSlot: false,
    addCompany: false
  },
  selectedMenu: null,
  menus: {
    admin: [
      {
        text: "İşlemler",
        link: "/pending-transactions-list",
        icon: "mdi-bank-transfer"
      },
      {
        text: "Hesaplar",
        icon: "mdi-badge-account-horizontal-outline",
        link: "/slots-list"
      },
      {
        text: "Firmalar",
        icon: "mdi-domain",
        link: "/companies-list"
      },
      {
        text: "Ayarlar",
        link: "/settings",
        icon: "mdi-cog-outline"
      }
    ],
    company: [
      {
        text: "İşlemler",
        link: "/company-transactions-list",
        icon: "mdi-bank-transfer"
      },
      {
        text: "Ayarlar",
        link: "/settings",
        icon: "mdi-cog-outline"
      }
    ]
  },
  paymentMethods: [
    { text: "Banka Transferi", value: "banktransfer" },
    { text: "Sanal Cüzdan", value: "wallet" },
    { text: "Kripto Para", value: "crypto" },
    { text: "Anında Havale", value: "anindahavale" }
  ],

  /// KULLANILMIYOR.

  slotGroups: [
    //BANKS
    { paymentMethod: "banktransfer", text: "Akbank", value: "akbank" },
    { paymentMethod: "banktransfer", text: "Ziraat Bankası", value: "ziraatbankasi" },
    { paymentMethod: "banktransfer", text: "Teb Bankası", value: "tebbank" },
    { paymentMethod: "banktransfer", text: "Yapı Kredi", value: "yapikredi" },
    { paymentMethod: "banktransfer", text: "İş Bankası", value: "isbank" },
    { paymentMethod: "banktransfer", text: "Finans Bank", value: "finansbank" },
    { paymentMethod: "banktransfer", text: "Garanti BBVA", value: "garanti" },
    { paymentMethod: "banktransfer", text: "Denizbank", value: "denizbank" },
    { paymentMethod: "banktransfer", text: "Vakıfbank", value: "vakifbank" },
    // CRYPTO
    { paymentMethod: "crypto", text: "Bitcoin", value: "bitcoin" },
    // WALLETS
    { paymentMethod: "wallet", text: "Papara", value: "papara" },
    { paymentMethod: "wallet", text: "Jeton", value: "jeton" },
    { paymentMethod: "wallet", text: "CMT", value: "cmt" },
    { paymentMethod: "wallet", text: "Payfix", value: "payfix" }
  ],

  slotGroupsBelkiSonra: {
    //BANKS
    banktransfer: [
      { text: "Akbank", value: "akbank" },
      { text: "Ziraat Bankası", value: "ziraatbankasi" },
      { text: "Teb Bankası", value: "tebbank" },
      { text: "Yapı Kredi", value: "yapikredi" },
      { text: "İş Bankası", value: "isbank" },
      { text: "Finans Bank", value: "finansbank" },
      { text: "Garanti BBVA", value: "garanti" }
    ],
    // CRYPTO
    bitcoin: [{ text: "Bitcoin", value: "bitcoin" }],
    // WALLETS
    papara: [{ text: "Papara", value: "papara" }],
    jeton: [{ text: "Jeton", value: "jeton" }],
    cmt: [{ text: "CMT", value: "cmt" }],
    payfix: [{ text: "Payfix", value: "payfix" }]
  }
};
