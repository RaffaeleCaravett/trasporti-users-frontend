import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private annuncio: string = '/annuncio';
  private azienda: string = '/azienda';
  private trasportatore: string = '/trasportatore';
  private annuncioAzienda: string = '/azienda/annuncio';
  private byAzienda: string = '/byAzienda';
  private byRetribuzione: string = '/byRetribuzione';
  private byTrasportatoreId: string = '/byTrasportatoreId';
  private byAziendaId: string = '/byAziendaId';
  private byData: string = '/byData';
  private byParams: string = '/byParams';
  private spedizione: string = '/spedizione';
  private spedizioneAzienda: string = '/azienda/spedizione';
  private andStato: string = 'AndStato';
  private reset: string = '/reset';
  private findByCitta: string = '/findByCitta';
  private findByNomeAndCognomeContaining: string =
    '/findByNomeAndCognomeContaining';
  private findByCittaAndNomeAndCognomeContaining: String =
    '/findByCittaAndNomeAndCognomeContaining';
  private aziendaStatistica: string = '/azienda/statistica';
  private richiedi: string = '/richiedi';
  private chat: string = '/chat';

  constructor(private httpClient: HttpClient) {}

  publicAnnuncio(annuncioDTO: any) {
    return this.httpClient.post(
      environment.API_URL + this.annuncioAzienda,
      annuncioDTO
    );
  }
  putAnnuncioByAzienda(
    annuncioDTO: any,
    annuncioId: number,
    aziendaId: number
  ) {
    return this.httpClient.put(
      environment.API_URL +
        this.annuncioAzienda +
        `/${aziendaId}/${annuncioId}`,
      annuncioDTO
    );
  }
  putSpedizioneByAzienda(spedizioneDTO: any, spedizioneId: number) {
    return this.httpClient.put(
      environment.API_URL + this.spedizioneAzienda + `/${spedizioneId}`,
      spedizioneDTO
    );
  }
  deleteAnnuncioByAzienda(annuncioId: number, aziendaId: number) {
    return this.httpClient.delete(
      environment.API_URL +
        this.annuncioAzienda +
        this.byAzienda +
        `/${aziendaId}/${annuncioId}`
    );
  }
  getByRetribuzione(
    retribuzione1: number,
    retribuzione2: number,
    page: number,
    size: number,
    orderBy: string,
    azienda?: boolean
  ) {
    if (azienda) {
      return this.httpClient.get(
        environment.API_URL +
          this.annuncioAzienda +
          this.byRetribuzione +
          `/${retribuzione1}/${retribuzione2}/me?page=${page}&size=${size}&orderBy=${orderBy}`
      );
    } else {
      return this.httpClient.get(
        environment.API_URL +
          this.annuncioAzienda +
          this.byRetribuzione +
          `/${retribuzione1}/${retribuzione2}?page=${page}&size=${size}&orderBy=${orderBy}`
      );
    }
  }
  getByData(
    anno1: number,
    mese1: number,
    giorno1: number,
    anno2: number,
    mese2: number,
    giorno2: number,
    page: number,
    size: number,
    orderBy: string,
    azienda?: boolean
  ) {
    if (azienda) {
      return this.httpClient.get(
        environment.API_URL +
          this.annuncioAzienda +
          this.byData +
          `/${anno1}/${mese1}/${giorno1}/${anno2}/${mese2}/${giorno2}/me?page=${page}&size=${size}&orderBy=${orderBy}`
      );
    } else {
      return this.httpClient.get(
        environment.API_URL +
          this.annuncioAzienda +
          this.byData +
          `/${anno1}/${mese1}/${giorno1}/${anno2}/${mese2}/${giorno2}?page=${page}&size=${size}&orderBy=${orderBy}`
      );
    }
  }
  postSpedizione(spedizioneDTO: any) {
    return this.httpClient.post(
      environment.API_URL + this.spedizioneAzienda,
      spedizioneDTO
    );
  }
  getAnnunciByAziendaId(
    aziendaId: number,
    page?: number,
    size?: number,
    orderBy?: string
  ) {
    return this.httpClient.get(
      environment.API_URL +
        this.annuncioAzienda +
        this.byAzienda +
        `Id/${aziendaId}?page=${page || 0}&size=${size || 10}&orderBy=${
          orderBy || 'id'
        }`
    );
  }
  getAnnunciByAziendaIdAndStato(aziendaId: number, stato: string) {
    return this.httpClient.get(
      environment.API_URL +
        this.annuncioAzienda +
        this.byAzienda +
        'Id' +
        this.andStato +
        `/${aziendaId}/${stato}`
    );
  }
  getAnnunciByAziendaIdAndStatoPubblicata(aziendaId: number) {
    return this.httpClient.get(
      environment.API_URL +
        this.annuncioAzienda +
        this.byAzienda +
        'Id' +
        this.andStato +
        `Pubblicata/${aziendaId}`
    );
  }
  putAziendaById(profileImage: any, aziendaDTO: {}, aziendaId?: number) {
    let formData = new FormData();
    formData.append(
      'aziendaDTO',
      new Blob([JSON.stringify(aziendaDTO)], {
        type: 'application/json',
      })
    );
    formData.append('profileImage', profileImage);
    return this.httpClient.put(
      environment.API_URL +
        this.azienda +
        `${
          aziendaId != null &&
          aziendaId != undefined &&
          aziendaId != 0 &&
          aziendaId
            ? '/' + aziendaId
            : '/me'
        }`,
      formData
    );
  }
  putTrasportatoreById(
    profileImage: any,
    trasportatoreDTO: {},
    trasportatoreId?: number
  ) {
    let formData = new FormData();
    formData.append(
      'trasportatoreDTO',
      new Blob([JSON.stringify(trasportatoreDTO)], {
        type: 'application/json',
      })
    );
    formData.append('profileImage', profileImage);
    return this.httpClient.put(
      environment.API_URL +
        this.trasportatore +
        `${
          trasportatoreId != null &&
          trasportatoreId != undefined &&
          trasportatoreId != 0 &&
          trasportatoreId
            ? '/' + trasportatoreId
            : '/me'
        }`,
      formData
    );
  }
  deleteProfile() {}
  getAllTrasportatori() {
    return this.httpClient.get(environment.API_URL + this.trasportatore);
  }
  changePasswordByProfileAz(oltPassword: string, newPassword: string) {
    return this.httpClient.get(
      environment.API_URL +
        this.azienda +
        this.reset +
        `/${newPassword}/${oltPassword}/me`
    );
  }
  changePasswordByProfileTr(oltPassword: string, newPassword: string) {
    return this.httpClient.get(
      environment.API_URL +
        this.trasportatore +
        this.reset +
        `/${newPassword}/${oltPassword}/me`
    );
  }
  getTrByCitta(citta: string, page: number, size: number, orderBy: string) {
    return this.httpClient.get(
      environment.API_URL +
        this.azienda +
        this.trasportatore +
        this.findByCitta +
        `/${citta}?page=${page || 0}&size=${size || 5}&orderBy=${
          orderBy || 'id'
        }`
    );
  }
  getTrByNomeAndCognome(
    nome: string,
    cognome: string,
    page: number,
    size: number,
    orderBy: string
  ) {
    return this.httpClient.get(
      environment.API_URL +
        this.azienda +
        this.trasportatore +
        this.findByNomeAndCognomeContaining +
        `/${nome}/${cognome}?page=${page || 0}&size=${size || 5}&orderBy=${
          orderBy || 'id'
        }`
    );
  }
  getTrByNomeAndCognomeAndCitta(
    nome: string,
    cognome: string,
    citta: string,
    page: number,
    size: number,
    orderBy: string
  ) {
    return this.httpClient.get(
      environment.API_URL +
        this.azienda +
        this.trasportatore +
        this.findByCittaAndNomeAndCognomeContaining +
        `/${nome}/${cognome}/${citta}?page=${page || 0}&size=${
          size || 5
        }&orderBy=${orderBy || 'id'}`
    );
  }
  getStatisticaByAziendaId(id: number) {
    return this.httpClient.get(
      environment.API_URL + this.aziendaStatistica + `/${id}`
    );
  }
  getAllAnnunci(orderBy: string, order: string, page?: number) {
    return this.httpClient.get(
      environment.API_URL +
        this.trasportatore +
        this.annuncio +
        `?orderBy=${orderBy || 'id'}&direction=${order}&page=${page || 0}`
    );
  }
  richiediSpedizione(spedizioneId: number) {
    return this.httpClient.get(
      environment.API_URL +
        this.trasportatore +
        this.spedizione +
        this.richiedi +
        `/${spedizioneId}/me`
    );
  }
  postChat(aziendaId: number, trasportatoreId: number, role: string) {
    let chatDTO = {
      azienda_id: aziendaId,
      trasportatore_id: trasportatoreId,
    };
    if (role == 'Trasportatore') {
      return this.httpClient.post(
        environment.API_URL + this.trasportatore + this.chat,
        chatDTO
      );
    } else {
      return this.httpClient.post(
        environment.API_URL + this.azienda + this.chat,
        chatDTO
      );
    }
  }
  getSpedizioniByTrId(
    trasportatoreId: number,
    statoSpedizione?: string,
    page?: number,
    direction?: string
  ) {
    switch (statoSpedizione) {
      case 'In corso':
        {
          statoSpedizione = 'In_corso';
        }
        break;
      case 'Terminata':
        {
          statoSpedizione = 'A_termine';
        }
        break;
      default:
        {
          //don't worry
        }
        break;
    }

    return this.httpClient.get(
      environment.API_URL +
        this.trasportatore +
        this.spedizione +
        this.byTrasportatoreId +
        `/${trasportatoreId}` +
        '?stato=' +
        (statoSpedizione || 'Richiesta') +
        '&page=' +
        (page || 0) +
        '&sort=' +
        (direction || 'ASC')
    );
  }
  getSpedizioniByStatoAndAziendaId(statoSpedizione: string, aziendaId: number) {
    return this.httpClient.get(
      environment.API_URL +
        this.azienda +
        this.spedizione +
        this.byAziendaId +
        `/AndStato/${aziendaId}/${statoSpedizione}`
    );
  }

  getAziendaByParams(
    nome: string,
    email: string,
    partitaIva: string,
    citta: string
  ) {
    return this.httpClient.get(
      environment.API_URL +
        this.trasportatore +
        this.azienda +
        this.byParams +
        '?nome=' +
        nome +
        '&email=' +
        email +
        '&partitaIva=' +
        partitaIva +
        '&citta=' +
        citta
    );
  }
}
