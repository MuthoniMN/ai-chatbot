export const getLanguage = (lang: string) => {
  switch(lang){
    case 'en':
      return 'English';
    case 'pt':
      return 'Portuguese';
    case 'es':
      return 'Spanish';
    case 'ru':
      return 'Russian';
    case 'tr':
      return 'Turkish';
    case 'fr':
      return 'French';
    default:
      return '';
  }
}
