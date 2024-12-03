Folder:
    assets: 

    components: chứa các thành phần sử dụng chung như button, card, avatar...

    pages: các trang hoàn chỉnh 

    partials: các thành phần được render xuyên suốt trên web (Header, Footer, NavBar)

    routes: xử lý các điều hướng của người dùng

    style: vị trí tạm thời để tham khảo các style được viết từ đồ án trước

Trang sẽ được file index.js render vào file index.html trong pulic

file jsconfig.json để định nghĩa các path để có thể sử dụng absolute path trong các file 

Ưu tiên sử dụng các màu trong token.css thay vì mã màu

** hạn chế sử dụng relative path nha mn
** mỗi pages nên có folder và style.css riêng 

Luôn viết css dưới dạng chỉ định nhiều className của element 1 lúc

VD: h1.titleInPopUp, form#LoginForm

không được chỉ chọn đến những tag vd: div {color: red} , h1 { height: 30px } 


components chung :

Dấu X :  AiOutlineClose
Dấu mũi tên trái : AiOutlineLeft 
từ "react-icons/ai";

