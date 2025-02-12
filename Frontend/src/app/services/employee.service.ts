import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/employees'; // Ensure this matches your backend

  constructor(private http: HttpClient) {}

  // ✅ Create Employee (POST)
  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, employee)
      .pipe(catchError(this.handleError)); // Error handling added
  }

  // ✅ Get All Employees (GET)
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(catchError(this.handleError)); // Error handling added
  }

  // ✅ Update Employee (PUT)
  updateEmployee(id: string, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, employee)
      .pipe(catchError(this.handleError)); // Error handling added
  }

  // ✅ Delete Employee (DELETE)
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
      .pipe(catchError(this.handleError)); // Error handling added
  }

  // ❗ Generic error handler to catch API errors
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unexpected error occurred. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `⚠️ Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 400) {
        errorMessage = '⚠️ Invalid request! Please check your input.';
      } else if (error.status === 404) {
        errorMessage = '⚠️ Requested resource not found!';
      } else if (error.status === 500) {
        errorMessage = '❌ Server error! Please try again later.';
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
