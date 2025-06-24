import auth from './authToken.js'

function displayCartItemToTable(dataListResponse){
    const tableBodyCartItem = document.getElementById("tbody-cart-list")

}

export async function loadCartItem(){
    const userId = auth.getUserId()
    try{
        const response = await fetch(`http://localhost:8080/api/cart-items/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if(response.ok){
            const dataResponse = await response.json()
            displayCartItemToTable(dataResponse.result)
        }
    } catch(error){
        alert("Lỗi khi loadCartItem - 2")
        console.error("Lỗi khi loadCartItem - 2", error)
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadCartItem();
})

export default loadCartItem