import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class ImagemService {
  private urImagens: string[] = [
    'assets/images/patientIcons/woman.png', 
    'assets/images/patientIcons/woman (1).png', 
    'assets/images/patientIcons/woman (2).png', 
    'assets/images/patientIcons/woman (3).png', 
    'assets/images/patientIcons/woman (4).png', 
    'assets/images/patientIcons/woman (5).png', 
    'assets/images/patientIcons/woman (6).png', 
    'assets/images/patientIcons/woman (7).png', 
    'assets/images/patientIcons/woman (8).png', 
  ];

  private indexAtual: number = 0;

  getProximoIcone(): string {
    const proxImagem = this.urImagens[this.indexAtual];
    this.indexAtual = (this.indexAtual + 1) % this.urImagens.length; 
    return proxImagem;
  }
}
