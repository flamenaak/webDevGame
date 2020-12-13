export const successPopup = (
  setSnackbarState: React.Dispatch<React.SetStateAction<any>>,
  message: string
) => {
  setSnackbarState({
    id: Math.random(),
    type: "success",
    message: message,
  });
};

export const infoPopup = (
  setSnackbarState: React.Dispatch<React.SetStateAction<any>>,
  message: string
) => {
  setSnackbarState({
    id: Math.random(),
    type: "secondary",
    message: message,
  });
};

export const errorPopup = (
  setSnackbarState: React.Dispatch<React.SetStateAction<any>>,
  message: string
) => {
  setSnackbarState({
    id: Math.random(),
    type: "danger",
    message: message,
  });
};
