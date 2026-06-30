const {test,expect} = require('@playwright/test')

    const baseUrl = 'https://eventhub.rahulshettyacademy.com'

async function login(page){
    
    const email = "nselvamanikandan@gmail.com"
    const password = "Test@1234567"
    //Step 1
    await page.goto(baseUrl)
    await page.getByPlaceholder('you@email.com').fill(email)
    await page.getByPlaceholder('••••••').fill(password)
    await page.locator('#login-btn').click()
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible()


}

async function bookTicket(page,userDetails){
    const {name,email,phone,ticketCount=1} = userDetails

    const defaultTicketCount = await page.locator('#ticket-count')
    await expect(defaultTicketCount).toHaveText('1')
     
    for(let i=1;i<ticketCount;++i)
    {
        const incrementButton = await page.getByRole('button', { name: '+' })
        await incrementButton.click()

    }

    await page.getByPlaceholder('Your full name').fill(name)
    await page.locator('#customer-email').fill(email)
    await page.getByPlaceholder('+91 98765 43210').fill(phone)
    await page.locator('#confirm-booking').click()


}


test('Validate login',async({page})=>{
    
    await login(page)

 
    //Step 2
    await page.getByRole('button', { name: 'Admin' }).click()
    await page.getByRole('link', { name: 'Manage Events' }).first().click()
    await page.locator('h2.text-gray-900').first().waitFor()
    await page.locator(' #event-title-input').fill('Test Event')
    await page.locator('#admin-event-form textarea').fill('This is a test event created by Playwright')
    await page.locator('#city').fill('Chennai')
    await page.locator('#venue').fill('Chennai Trade Center')
    await page.locator("//input[@id='event-date-&-time']").click()
    await page.locator("//input[@id='event-date-&-time']").fill('2026-12-10T09:30')
    await page.locator("//input[@id='price-($)']").fill('100')  
    await page.locator('#total-seats').fill('50') 
    await page.locator("//button[@id='add-event-btn']").click()
    await expect(page.getByText('Event created!')).toBeVisible()



    //step 3 
    await page.locator('#nav-events').click()
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible()
    const MyEventCard = await page.locator('[data-testid="event-card"]').filter({ hasText: 'Test Event' })    
    await expect(MyEventCard).toBeVisible()
    const seatCount = await MyEventCard.locator('span.text-emerald-600').textContent()
    console.log('Available seats for Test Event:', seatCount)
    const seatsBeforeBooking = parseInt(seatCount)
    console.log('Available seats for Test Event:', seatsBeforeBooking) 
    //Step 4
    await MyEventCard.locator('#book-now-btn').click()
    //Step 5
    const defaultTicketCount = await page.locator('#ticket-count').textContent()
    await expect(defaultTicketCount).toBe('1')
    await page.getByPlaceholder('Your full name').fill('Selva')
    await page.locator('#customer-email').fill('nselvamanikandan@gmail.com')
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210')
    await page.locator('#confirm-booking').click()
    //Step 6
    await page.locator('span.text-gray-500').last().waitFor()
    const bookingRef = await page.locator('span.booking-ref').textContent()
    console.log('Booking Reference:', bookingRef)
    //Step 7
    await page.getByTestId('nav-bookings').click()
    await expect(page).toHaveURL(baseUrl + '/bookings')
    const bookingCards =await page.locator('#booking-card')
    await bookingCards.first().waitFor()
    await expect(bookingCards.locator('span.booking-ref').filter({ hasText: bookingRef })).toBeVisible()
    await expect(bookingCards.locator('h3.font-semibold').filter({ hasText: 'Test Event' }).first()).toBeVisible()
    //Step 8  Verify seat reduction
    await page.locator('#nav-events').click()
    expect(await page.locator('[data-testid="event-card"]').first()).toBeVisible()
    await expect(MyEventCard).toBeVisible()
    const seatCountafterBk = await MyEventCard.locator('span.text-emerald-600').textContent()
    console.log('Available seats for Test Event:', seatCountafterBk)
    const seatsAfterBooking = parseInt(seatCountafterBk)
    console.log('Available seats for Test Event:', seatsAfterBooking)
    await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1)

})

test(' Single ticket booking is eligible for refund',async({page})=>{

    const bookingCards =await page.locator('#booking-card')

    //Step 1
    await login(page)
    //Step 2  Book first event with 1 ticket (default)
    await page.locator('#nav-events').click()
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible()
    await page.locator('[data-testid="event-card"]').first().locator('#book-now-btn').click()
    await bookTicket(page,{name:'Selva',email:'nselvamanikandan@gmail.com',phone:'9876543210',ticketCount:1})

    //Step 3 Navigate to booking detail
     await page.getByTestId('nav-bookings').click()
    await expect(page).toHaveURL(baseUrl + '/bookings')

    await bookingCards.first().waitFor()
    await page.locator('button.text-gray-700').first().click()
    await expect(page.locator('div.bg-white').first()).toBeVisible()
    //Step  4 Validate booking ref 
    const bookingRef = await page.locator('span.text-indigo-600').first().textContent() 
    console.log('Booking Reference:', bookingRef)
    const eventDetails =await page.locator('span.text-right').first().textContent()
    console.log('Event Details:', eventDetails)
    await expect(bookingRef.charAt(0)).toBe(eventDetails.charAt(0))
    //Step 5 — Check refund eligibility
    await page.locator('#check-refund-btn').click()
    const spinner = page.locator('#refund-spinner')
    await expect(spinner).toBeVisible()
    await expect(spinner).toBeHidden({timeout: 6000})
    //Step 6 — Validate result //Single-ticket bookings qualify for a full refund
    const refundResult = await page.locator('#refund-result')
    await expect(refundResult).toBeVisible()
    await expect(refundResult).toContainText('Eligible for refund.')
    await expect(refundResult).toContainText(' Single-ticket bookings qualify for a full refund.')


})


test('Multiple ticket booking is not eligible for refund',async({page})=>{


    const bookingCards =await page.locator('#booking-card')

    //Step 1
    await login(page)
    //Step 2  Book first event with 1 ticket (default)
    await page.locator('#nav-events').click()
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible()
    await page.locator('[data-testid="event-card"]').first().locator('#book-now-btn').click()

    await bookTicket(page,{name:'Selva',email:'nselvamanikandan@gmail.com',phone:'9876543210',ticketCount:3})

    //Step 3 Navigate to booking detail
     await page.getByTestId('nav-bookings').click()
    await expect(page).toHaveURL(baseUrl + '/bookings')
    await bookingCards.first().waitFor()
    await page.locator('button.text-gray-700').first().click()
    await expect(page.locator('div.bg-white').first()).toBeVisible()
    //Step  4 Validate booking ref 
    const bookingRef = await page.locator('span.text-indigo-600').first().textContent() 
    console.log('Booking Reference:', bookingRef)
    const eventDetails =await page.locator('span.text-right').first().textContent()
    console.log('Event Details:', eventDetails)
    await expect(bookingRef.charAt(0)).toBe(eventDetails.charAt(0))
    //Step 5 — Check refund eligibility
    await page.locator('#check-refund-btn').click()
    const spinner = page.locator('#refund-spinner')
    await expect(spinner).toBeVisible()
    await expect(spinner).toBeHidden({timeout: 6000})
   // Step 6 — Validate result (different assertions)
    const refundResult = await page.locator('#refund-result')
    await expect(refundResult).toBeVisible()
    await expect(refundResult).toContainText('Not eligible for refund.')
    await expect(refundResult).toContainText(' Group bookings (3 tickets) are non-refundable')

})
