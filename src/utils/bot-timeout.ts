export const botTimeOut = (
    text: string,
    updateMessage: (text: string) => void,
    delay: number = 100
  ) => {
    const words = text.split(' ');
    let currentText = '';
    words.forEach((word, index) => {
      setTimeout(() => {
        currentText += word + ' ';
        updateMessage(currentText);
      }, index * delay);
    });
  };
  