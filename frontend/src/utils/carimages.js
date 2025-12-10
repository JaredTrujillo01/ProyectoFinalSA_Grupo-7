// utils/carImages.js
import toyotaImg from '../assets/images/toyota-corolla.jpg';  
import hondaImg from '../assets/images/honda-civic.jpg';
import hondacrv from '../assets/images/honda-crv.jpg';
import hyundaiEla from'../assets/images/hyundai-elantra.jpg';
import hyundaisata from'../assets/images/hyundai-santafe.jpg';
import hyundaitc from'../assets/images/hyundai-tucson.jpg';
import kiapi from'../assets/images/kia-picanto.jpg';
import kiario from'../assets/images/kia-rio.jpg';
import kiasorento from'../assets/images/kia-sorento.jpg';
import mitsubi from'../assets/images/mitsubichi-montero.jpg';
import nissanfr from'../assets/images/nissan-frontier.jpg';
import toyota4runner from'../assets/images/toyota-4runner.jpg';
import toyotahiace from'../assets/images/toyota-hiace.jpg';
import toyotahilux from'../assets/images/toyota-hilux.jpg';
import toyotaprado from'../assets/images/toyota-prado.jpg';
import toyotarav4 from'../assets/images/toyota.rav4.jpg';
import placeholderImg from '../assets/images/Placeholder.jpg';

export const availableImages = [
    { label: 'Toyota Corolla', value: toyotaImg },
    { label: 'Honda Civic', value: hondaImg },
    { label: 'Honda CR-V', value: hondacrv },
    { label: 'Hyundai Elantra', value: hyundaiEla },
    { label: 'Hyundai Santa Fe', value: hyundaisata },
    { label: 'Hyundai Tucson', value: hyundaitc },
    { label: 'Kia Picanto', value: kiapi },
    { label: 'Kia Rio', value: kiario },
    { label: 'Kia Sorento', value: kiasorento },
    { label: 'Mitsubishi Montero', value: mitsubi },
    { label: 'Nissan Frontier', value: nissanfr },
    { label: 'Toyota 4Runner', value: toyota4runner },
    { label: 'Toyota Hiace', value: toyotahiace },
    { label: 'Toyota Hilux', value: toyotahilux },
    { label: 'Toyota Prado', value: toyotaprado },
    { label: 'Toyota RAV4', value: toyotarav4 },
];

export const getCarImage = (marca, modelo) => {
  const key = `${marca.toLowerCase()}-${modelo.toLowerCase()}`;
  const imageMap = {
    'toyota-corolla': toyotaImg,
    'honda-civic': hondaImg,
    'honda-cr-v': hondacrv,
    'hyundai-elantra': hyundaiEla,
    'hyundai-santafe': hyundaisata,
    'hyundai-tucson': hyundaitc,
    'kia-picanto': kiapi,
    'kia-rio': kiario,
    'kia-sorento': kiasorento,
    'mitsubichi-montero': mitsubi,
    'nissan-frontier': nissanfr,
    'toyota-4runner': toyota4runner,
    'toyota-hiace': toyotahiace,
    'toyota-hilux': toyotahilux,
    'toyota-prado': toyotaprado,
    'toyota-rav4': toyotarav4,

  };
  return imageMap[key] || placeholderImg;
};

