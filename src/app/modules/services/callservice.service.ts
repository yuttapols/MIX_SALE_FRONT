import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, concat } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' }) };
const httpOptionsText = { headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }) };

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  constructor(private http: HttpClient

  ) { }
  // หน้ายูสเซอร์ เข้าสู่ระบบ
  getUsernamePassword(username: any, password: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/login/' + username + '/' + password));
  }
  // รีเซ๊ตรหัสผ่าน
  getResetPassWord(email: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/user/resetPassWord/?email=' + email));
  }
  // สมัครสมาชิก
  saveRegister(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/user/saveregister'), body, httpOptions)
  }
  // เปลี่ยนรหัสผ่าน
  changePassword(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/user/changePassword'), body, httpOptions)
    // /car/updeleteCar/15
  }
  // เปลี่ยนรหัสผ่าน การ get ById
  getUserById(userId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/user/getUserById?userId=' + userId), httpOptions)
  }
  // การแสดงรายละเอียกการสั่งจอง
  getReserveByUserId(userId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/reserve/reserveByUserId/?userId=' + userId), httpOptions)
  }
  // การแก้ไข้ข้อมูลสาชิก
  getUserDetailByUserId(userId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/userdetail/getUserDetailByUserId?userId=' + userId));
  }
  // การแก้ไข้ข้อมูลสาชิก
  updeleteUserDetail(data: any): Observable<any>{
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/userdetail/updeleteUserDetail'),body,httpOptions)
  }


  ////////////////////////////////////////// หน้าแอดมิน //////////////////////////////////////////////////
  // หน้าแอดมิน ลบข้อมูลผู้ใช้งาน
  deleteUser(userId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/user/deleteUserById/?userId=' + userId), { responseType: 'text' });
  }
  // หน้าแอดมิน ข้อมูลยูสเซอร์
  getUserDetailAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/userdetail/getUserDetailAll'));
  }
  // หน้าแอดมิน ข้อมูลรถยนต์
  getCarAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/car/getCarAll'));
  }
  // หน้าแอดมิน การ get ข้อมูลรถยนต์ด้วย id หรือ getCarById
  getCarById(carId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/car/getCarById/?carId=' + carId), httpOptions);

    // car/getCarById?carDetailId=15
  }
  // หน้าแอดมิน อัพเดทข้อมูลรถยนต์ หรือ อัพเดทการแก้ไขข้อมูล
  saveOrupdeleteCar(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/car/saveOrupdeleteCar'), body, httpOptions)
    // /car/updeleteCar/15
  }
  uploadFileCar(data: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat('/image/uploadFileCar'), data);
    // /image/uploadFile?imageId=3
  }
  // หน้าแอดมิน ลบข้อมูลรถยนต์
  deleteCar(carId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/car/deleteCar/?carId=' + carId), { responseType: 'text' });
  }
  // หน้าแอดมิน การอนุมัติการสั่งจอง
  getReserveAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/reserve/getReserveAll'));
  }
  // หน้าแอดมิน การตรวจสอบและยืนยันการอนุมัติการสั่งจอง
  getReserveById(reserveId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/reserve/getReserveById?reserveId=' + reserveId), httpOptions)
  }

  // หน้าแอดมิน การอนุมติการสั่งจองด้วยการ updeleteStatus
  updeleteStatusReserve(resordStatus: any, reserveId: any): Observable<any> {

    return this.http.post<any>(API_ENDPOINT.concat('/reserve/updeleteStatus?resordStatus=' + resordStatus + '&reserveId=' + reserveId), httpOptions)
  }
  // save การสั่งจองของลูกค้า
  saveReserve(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/reserve/saveReserve'), body, httpOptions)
  }
  // updeletePaymentReserve(payId:any, reserveId:AnyCatcher): Observable<any>{

  //   return this.http.post<any>(API_ENDPOINT.concat('/reserve/updeleteReserve'),httpOptions)
  // }
  // หน้าแอดมิน การ getall การเอาข้อมมูลมาโชว์ทั้งหมด
  getBankAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/bank/getBankAll'));
  }
  // หน้าแอดมิน get ID ของธนาคาร
  getBankById(bkId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/bank/getBankById?bankId=' + bkId), httpOptions);
  }
  // หน้าแอดมิน อักเดทข้อมูลธนาคาร
  saveOrupdeleteBank(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/bank/saveOrupdeleteBank'), body, httpOptions);
    // bank/updeleteBank
  }
  // หน้าแอดมิน uploadFileBank
  uploadFileBank(data: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat('/bank/uploadFile'), data);
    // bank/updeleteBank
  }
  // หน้าแอดมิน การลบข้อมูลของธนาคาร
  deleteBank(bkId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/bank/deleteBankById/?bkId=' + bkId), { responseType: 'text' });
  }
  //  หน้าแอดมิน รายงานผล
  genRePort(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/genexcel/genReport'));
  }

  deleteImage(carImageId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/image/deleteImageById?carImageId=' + carImageId), { responseType: 'text' });
  }

  getCarBrand(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/car/getCarBrand'));
  }

  getCarByCarBrand(carBrand: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/car/getCarByCarBrand?carBrand=' + carBrand), httpOptions);
  }



  getThaiProvincesAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/getThaiProvincesAll'));
  }

  getThaiAmphuresAllByProvinceId(provincesId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/getThaiAmphuresAllByProvinceId?provinceId=' + provincesId));
  }
  getThaiTambonsAllByAmphuresId(amphuresId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/getThaiTambonsAllByAmphuresId?amphuresId=' + amphuresId));
  }

  getThaiTambonsById(tambonsId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/getThaiTambonsById?thaiTambonsId=' + tambonsId));
  }

  getReserveAllByStauts(status: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/reserve/getReserveAllByStauts?resordStatus=' + status), httpOptions)
  }

  uploadFilePayment(data: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat('/payment/uploadFile'), data);
    // bank/updeleteBank
  }

  updateCarStatus(carId: any, status: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/car/updateCarStatus?carId=' + carId + '&status=' + status), httpOptions)
  }

  updateReserveStatus(reseverId: any, status: any): Observable<any> {
    return this.http.post(API_ENDPOINT.concat('/reserve/updeleteStatus?resordStatus='+status+'&reserveId='+reseverId), httpOptions)
  }
  getUserByRoleId(roleId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/user/getUserByRoleId?roleId=' + roleId), httpOptions)
  }
  
  getCountUser(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/user/getCountUser'), httpOptions)
  }

  getDropdown(dropdownTypeId: any,dropdownId : any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/dropdown/getDropdownByTypeIdandDropdownId?dropdownTypeId=' + dropdownTypeId+'&dropdownId='+dropdownId), httpOptions)
  }

  
  updeleteDropdownValue(value1: any,id : any): Observable<any> {
    return this.http.post(API_ENDPOINT.concat('/dropdown/updeleteDropdownValue?value1=' + value1+'&id='+id), httpOptions)
  }
  

}





