export const formatDate = (date:string) => {
    const newDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    
    const formattedDate = newDate.toLocaleDateString('en-US', options)
    return formattedDate
  }