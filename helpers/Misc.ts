import { ioSetting } from '@/model/Config';

export function formatDateToYYYYMMDD(vivDtm?: Date): string {
  if (vivDtm === null || vivDtm === undefined) {
    return '';
  }
  vivDtm = new Date(vivDtm);
  const year = vivDtm.getFullYear();
  const month = String(vivDtm.getMonth() + 1).padStart(2, '0');
  const day = String(vivDtm.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function Nro2Mes(vivnro?: number, vivstrLang?: string): string {
  if (vivnro === null || vivnro === undefined) {
    return '';
  }
  if (vivstrLang === null || vivstrLang === undefined) {
    return '';
  }
  if (vivstrLang === 'S') {
    switch (vivnro) {
      case 1:
        return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
        return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';
      default:
        return '';
    }
  }
  return '';
}
export function Str2Any(vivstr?: string): any {
  if (vivstr === null || vivstr === undefined) {
    return null;
  }
  return JSON.parse(atob(vivstr));
}

export function Log(vivstrCategory?: string,vivstrLog?: string): any {
    if (ioSetting === null || ioSetting.ivnumLogLevel > 0) {
        console.log(` ${vivstrCategory}: ${vivstrLog}`);
    }
}


