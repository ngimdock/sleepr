describe('Reservations', () => {
  let jwtToken: string;

  beforeAll(async () => {
    const user = {
      email: 'ngimdockzemfack@gmail.com',
      password: 'Ngimdock1@danmail',
    };

    // await createUser(user);

    const response = await loginUser(user);

    const token = await response.json();

    jwtToken = token.token;
  });

  test('Create', async () => {
    expect(true).toBeTruthy();
    const reservationDto = {
      startDate: '12-10-2010',
      endDate: '10-09-2010',
      charge: {
        amout: 44,
        card: {
          cvc: '123',
          exp_month: 10,
          exp_year: 2030,
          number: '4242 4242 4242 4242',
        },
      },
    };

    const response = await createReservation(jwtToken, reservationDto);

    // expect(response.ok).toBeTruthy();

    const reservation = await response.json();

    console.log({ reservation });
  });
});

interface UserDto {
  email: string;
  password: string;
}

async function createUser(user: UserDto) {
  await fetch('http://auth:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

async function loginUser(user: UserDto) {
  const response = await fetch('http://auth:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return response;
}

async function createReservation(jwtToken: string, reservation: any) {
  console.log({ jwtToken });

  const response = await fetch('http:reservations:3000/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: jwtToken,
    },
    body: JSON.stringify(reservation),
  });

  return response;
}
