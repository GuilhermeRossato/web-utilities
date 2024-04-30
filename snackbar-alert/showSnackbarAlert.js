function showSnackbarAlert(
  message = "Hello world",
  variant = "info",
  ms = 6000
) {
  // Main element
  const snack = document.createElement("div");
  snack.classList.add("standalone-snackbar-alert");
  snack.style.boxShadow =
    "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px";
  snack.style.display = "flex";
  snack.style.color = "#fff";
  snack.style.fontFamily = "Roboto,Helvetica,Arial,sans-serif";
  snack.style.borderRadius = "4px";
  snack.style.alignItems = "center";
  snack.style.overflow = "hidden";
  snack.style.cursor = "text";
  snack.style.border = "1px solid transparent";
  snack.style.transition = ["height", "transform", "opacity", "margin"]
    .map((prop) => `0.4s cubic-bezier(0.22, 0.61, 0.36, 1) ${prop}`)
    .join(", ");
  snack.style.width = "fit-content";
  if (message instanceof Error) {
    message = message.stack.split('\n').map(a => a.trim()).join(' ');
    variant = 'error';
  }
  const background = {
    info: "#0288d1",
    success: "#2e7d32",
    warning: "#ed6c02",
    error: "#d32f2f",
  }[variant];
  if (!background) {
    console.warn(`Unknown snackbar variant:`, variant);
  }
  snack.style.backgroundColor = background || "#0288d1";
  snack.style.height = "0";
  snack.style.opacity = "0";
  snack.style.transform = "translate(-80%, 0%)";
  snack.style.marginTop = "0";
  // Icon
  const shape = {
    info: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z",
    success:
      "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",
    warning:
      "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z",
    error:
      "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
  }[variant];
  if (shape) {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("width", "22px");
    icon.setAttribute("height", "22px");
    icon.setAttribute("viewbox", "0 0 24 24");
    icon.style.fill = "currentColor";
    const iconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    iconPath.setAttribute("d", shape);
    iconPath.style.fill = "currentColor";
    icon.appendChild(iconPath);
    const left = document.createElement("div");
    left.classList.add("standalone-snackbar-alert-variant-icon");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.justifyContent = "center";
    left.style.padding = "6px 8px 8px 6px";
    left.style.marginLeft = "6px";
    left.appendChild(icon);
    snack.appendChild(left);
  }
  // Label
  const label = document.createElement("div");
  label.classList.add("standalone-snackbar-alert-text");
  label.style.fontSize = "0.875rem";
  label.style.fontFamily = "Roboto, Helvetica, Arial, sans-serif";
  label.style.padding = "0 4px";
  label.style.color = "inherit";
  label.style.overflow = "hidden";
  label.style.textOverflow = "ellipsis";
  label.style.whiteSpace = "nowrap";
  label.style.minWidth = "160px";
  label.style.maxWidth = "70vw";
  label.textContent = message.trim();
  snack.appendChild(label);
  // Close
  const closeSnackbar = () => {
    snack.style.height = "0";
    snack.style.opacity = "0";
    snack.style.transform = "translate(-80%, 0%)";
    snack.style.marginTop = "0";
    snack.style.pointerEvents = "none";
    setTimeout(() => snack.remove(), 500);
  };
  const closeSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  closeSvg.setAttribute("width", "22px");
  closeSvg.setAttribute("height", "22px");
  closeSvg.setAttribute("viewbox", "0 0 24 24");
  closeSvg.style.fill = "currentColor";
  const closePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  closePath.setAttribute(
    "d",
    "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  );
  closePath.style.fill = "currentColor";
  closeSvg.appendChild(closePath);

  const close = document.createElement("div");
  close.classList.add("standalone-snackbar-alert-close");
  close.appendChild(closeSvg);
  close.style.display = "flex";
  close.style.alignItems = "center";
  close.style.justifyContent = "center";
  close.style.cursor = "pointer";
  close.style.padding = "5px 7px 7px 5px";
  close.style.borderRadius = "100px";
  close.style.marginRight = "6px";
  snack.appendChild(close);
  close.addEventListener("click", closeSnackbar);
  // Timeout
  let count = 0;
  let paused = false;
  if (ms > 0) {
    const interval = 100;
    const limit = ms / interval;
    const timer = setInterval(() => {
      if (!paused) {
        count++;
      }
      if (count >= limit) {
        clearInterval(timer);
        closeSnackbar();
      }
    }, interval);
  }
  snack.addEventListener("mouseenter", () => {
    snack.style.border = "1px solid white";
    paused = true;
  });
  snack.addEventListener("mouseleave", () => {
    snack.style.border = "1px solid transparent";
    paused = false;
  });
  let wrapper = document.querySelector(".standalone-snackbar-alert-wrapper");
  if (!wrapper) {
    const parent = document.createElement("div");
    parent.classList.add("standalone-snackbar-alert-wrapper");
    parent.style.position = "fixed";
    parent.style.zIndex = "9999";
    parent.style.bottom = "24px";
    parent.style.left = "24px";
    document.body.appendChild(parent);
    wrapper = parent;
  }
  wrapper.appendChild(snack);
  setTimeout(() => {
    snack.style.height = "40px";
    snack.style.opacity = "0.98";
    snack.style.transform = "translate(0%, 0%)";
    snack.style.marginTop = "8px";
  }, 75);
  return closeSnackbar;
}

// create a sequence of tests for the function above:
var m = 1.4;
// Test Case 1: Default values
setTimeout(
  () => showSnackbarAlert("Info snackbar message by default", "info", 4000),
  m * 250
);
// Expected: Snackbar with "Hello world" message, info variant, closes after 6 seconds

// Test Case 2: Custom message and success variant
setTimeout(
  () =>
    showSnackbarAlert("Variants: success, info, error, and warning", "success", 4000),
  m * 1000
);
// Expected: Snackbar with "Custom message" message, success variant, closes after 6 seconds

// Test Case 3: Custom message, warning variant, and custom close time
setTimeout(
  () =>
    showSnackbarAlert(
      "Long warning that got truncated because of message size",
      "warning",
      4000
    ),
  m * 2000
);
// Expected: Snackbar with "Warning message" message, warning variant, closes after 3 seconds

// Test Case 4: Custom message, unknown variant
setTimeout(
  () => showSnackbarAlert("This is an error snackbar alert", "error", 4000),
  m * 2500
);
// Expected: Snackbar with "Unknown variant" message, default info variant, closes after 6 seconds

setTimeout(
  () => showSnackbarAlert("Fade out timer that pauses on hover", "info", 4000),
  m * 3000
);
// Expected: Snackbar with "Hello world" message, info variant, closes after 6 seconds
