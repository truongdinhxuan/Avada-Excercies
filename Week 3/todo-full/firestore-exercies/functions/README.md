cấu hình respone API ở: Repository
<br>
<b>Về updatebulk hoặc deletebulk (liên quan đến xóa kiểu list)</b>
<a href="https://firebase.google.com/docs/firestore/query-data/queries">Document</a>
<br>
- khởi tạo một bacth để chứa .batch() để thực hiện nhiều method cùng lúc, vì vậy khai báo một 
operation để dùng
- body sẽ gửi dạng list
- sau đó sẽ loop để lọc 
- hàm where() dùng để đối chiếu, sau đó .get()
- sau đó commit() sẽ đẩy lên