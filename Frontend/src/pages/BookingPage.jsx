import React from 'react'

const BookingPage = () => {
  return (
    <div>
        <Grid item xs={9}>
    <Typography variant="h4" gutterBottom style={{ color: '#B89146' }}>
        My   Booking Details
    </Typography>
    <Box sx={{ height: "400px", overflowY: "scroll" }}>

        {bookedRooms && bookedRooms.length > 0 ? (

            bookedRooms.map((room, index) => (
                <Box key={index} style={{ padding: '1rem', border: '1px solid #B89146', borderRadius: '10px', marginBottom: '1rem', display: "flex", flexDirection: "row", alignItems: "center", gap: '1rem' }}>
                    <img src={room.imageUrl} alt="Room" style={{ width: '200px', height: "140px", borderRadius: '10px', marginTop: '1rem' }} />

                    <Box>

                        <Typography>Room Number: {room.roomNumber}</Typography>
                        <Typography>Room Type: {room.roomType}</Typography>
                        <Typography>Check-in Date: {new Date(room.guest.checkInDate).toLocaleDateString()}</Typography>
                        <Typography>Check-out Date: {new Date(room.guest.checkOutDate).toLocaleDateString()}</Typography>
                        <Typography>Total Bill: ${room.guest.totalBill}</Typography>
                    </Box>
                    <Box>
                        {!room.guest.checkInStatus && <Button variant="contained" color="primary" onClick={() => handleCheckIn(room)}>CheckIn</Button>
                        }
                        {room.guest.checkInStatus && !room.guest.checkOutStatus && <Button variant="contained" color="primary" onClick={() => handleCheckOut(room)}>CheckOut</Button>}

                        {room.guest.checkOutStatus && <Button variant="contained" color="primary" onClick={() => generateInvoice(room)}>Generate Invoice</Button>}
                    </Box>
                </Box>
            ))
        ) : (
            <Typography>No bookings found.</Typography>
        )}
    </Box>
</Grid></div>
  )
}

export default BookingPage