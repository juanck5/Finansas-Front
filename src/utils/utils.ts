// export const utils = {
    
//  formatCurrency: (value: string) => {
//     const num = value.replace(/[^\d]/g, ""); // quitar todo lo que no sea número
//     const int = parseInt(num, 10); // 👈 usamos enteros

//     if (isNaN(int)) return "";

//     return int.toLocaleString("es-CO", {
//       style: "currency",
//       currency: "COP",
//       maximumFractionDigits: 0, // 👈 sin decimales
//     });
//   }
//     }

export const utils = {
    
   formatCurrency: (value: string) => {
    const num = value.replace(/[^\d]/g, "");
    const int = parseInt(num, 10);
    if (isNaN(int)) return "";

    return int.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });
  },

  parseAndFormatCurrency: (raw: string) => {
    const numeric = raw.replace(/[^\d]/g, "");
    const int = parseInt(numeric, 10);
    const formatted = utils.formatCurrency(numeric);

    return {
      number: isNaN(int) ? 0 : int,
      formatted,
    };
  },
    }
    

    
