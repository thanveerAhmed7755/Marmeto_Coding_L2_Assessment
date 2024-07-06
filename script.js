const cardContainer = document.querySelector('.cards-container')

const url = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json'

const OneId = document.querySelector('.one'),
TwoId = document.querySelector('.two'),
ThreeId = document.querySelector('.three')

let selection = 0;
fetch(url).then(el => el.json()).then(vl => storeData(vl,selection))

const li = document.querySelectorAll('li')
OneId.classList.add('active')
TwoId.classList.remove('active')
ThreeId.classList.remove('active')
li.forEach((value) => 
{
    value.addEventListener('click',(e) => 
    { 

        if(e.target.id == '0')
            {
               OneId.classList.add('active')
               TwoId.classList.remove('active')
               ThreeId.classList.remove('active')
            }
        else if(e.target.id == '1')
        {
               OneId.classList.remove('active')
               TwoId.classList.add('active')
               ThreeId.classList.remove('active')
        }
        else if(e.target.id == '2')
        {
            OneId.classList.remove('active')
            TwoId.classList.remove('active')
            ThreeId.classList.add('active')
        }

        cardContainer.innerHTML = ''
        selection = e.target.id
        fetch(url).then(el => el.json()).then(vl => storeData(vl,selection))
    })
})

function createChildNode(data,index)
{
    let dummyDiscount;
   const parent = document.createElement('div')
   parent.className = 'parent'
   const img = document.createElement('img')
   const title = document.createElement('p')
   
   const price = document.createElement('p')
   const discount = document.createElement('p')
   discount.className = 'discount'
   const comparePrice = document.createElement('p')
   comparePrice.className = 'comparePrice'
   const vendor = document.createElement('p')
   const badgeText = document.createElement('p')
   const secondImg = document.createElement('img')
   const priceTag = document.createElement('div')
   const button = document.createElement('button')
   const badge = document.createElement('p')
   const dot = document.createElement('h2')
   dot.className = 'dot'
   badge.className = 'badge'
   button.innerHTML = 'Add to Cart'
   
   priceTag.className = 'priceTag'

   priceTag.appendChild(price)
   priceTag.appendChild(comparePrice)
   priceTag.appendChild(discount)

   const brand = document.createElement('div')
   brand.className = 'brand'
   brand.appendChild(title)
   brand.appendChild(dot)
   brand.appendChild(vendor)

   console.log(data)

   title.innerHTML = data.category_products[index].title
   price.innerHTML = "RS &nbsp;" + data.category_products[index].price
   comparePrice.innerText = data.category_products[index].compare_at_price
   vendor.innerHTML = data.category_products[index].vendor
   dot.innerText = '.'
   img.src = data.category_products[index].image

   badge.innerText = (data.category_products[index].badge_text  === null) ? '' : data.category_products[index].badge_text

   dummyDiscount = (parseInt(data.category_products[index].compare_at_price) - parseInt(data.category_products[index].price)) / parseInt(data.category_products[index].compare_at_price) * 100
   discount.innerText = Math.round(dummyDiscount)+"% Off"
   console.log("Discount = ",Math.round(dummyDiscount))



   parent.appendChild(img)
   parent.appendChild(brand)
   parent.appendChild(priceTag)
   parent.appendChild(button)
   if(data.category_products[index].badge_text != null)
    {
        parent.appendChild(badge)
    }
   cardContainer.appendChild(parent)
}

function storeData(obj,selection)
{
    let length = obj.categories[selection].category_products.length
   for(let i=0;i<length;i++)
    {
        createChildNode(obj.categories[selection],i)
    }

    console.log(obj)
}
