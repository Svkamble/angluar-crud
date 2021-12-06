import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RestaurentApiService {

  constructor(private http : HttpClient) { }

  getRestApi(){
    return this.http.get('http://localhost:3000/posts').pipe(map((res)=>{
      return res;
    }));
  }

  postRestApi(data:any){
    return this.http.post('http://localhost:3000/posts',data).pipe(map((res)=>{
      return res;
    }))
  }

  updateRestApi(data:any,id:number){
    return this.http.put('http://localhost:3000/posts/'+id,data).pipe(map((res)=>{
      return res;
    }))
  }

  deleteRestApi(id:number){
    return this.http.delete('http://localhost:3000/posts/'+id).pipe(map((res)=>{
      return res;
    }))
  }
}
