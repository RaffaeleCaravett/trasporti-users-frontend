@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private auth:string = '/auth'


  constructor(private http:HttpClient,private authGuard:AuthGuard) { }

getCities(){
  return this.http.get(environment.API_URL+this.auth)
}

}
