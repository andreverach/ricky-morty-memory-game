export interface Character {
  id: string;
  image: string;
  name: string;
  order: number;
}
export interface CharacterInfo {
  id: string;
  image: string;
  name: string;
  created: string;
  episode: Array<string>;
  gender: string;
  location: CharacterLocation;
  origin: CharacterOrigin;
  species: string;
  status: string;
  type: string;
  url: string;
  className: '' | 'tall' | 'wide' | 'big';
}
export interface CharacterLocation {  
  url: string;
  name: string;  
}
export interface CharacterOrigin {  
  url: string;
  name: string;  
}