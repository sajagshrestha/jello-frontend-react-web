const widgetStyles = {
  palette: {
    window: "#181818",
    windowBorder: "#90A0B3",
    tabIcon: "#fff",
    menuIcons: "#fff",
    textDark: "#000000",
    textLight: "#FFFFFF",
    link: "#0078FF",
    action: "#FF620C",
    inactiveTabIcon: "#90A0B3",
    error: "#F44235",
    inProgress: "#0078FF",
    complete: "#20B832",
    sourceBg: "#181818",
  },
  frame: {
    background: "rgba(0,0,0,0.9)",
  },
};

const widgetConfig = {
  cloudName: process.env.REACT_APP_CLOUDNAME,
  uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
  sources: ["local", "url"],
  styles: widgetStyles,
  multiple: false,
  folder: "images",
  showPoweredBy: false,
  singleUploadAutoClose: false,
  cropping: false,
};

export default widgetConfig;
