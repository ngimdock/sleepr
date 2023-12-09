describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'ngimdockzemfack@gmail.com',
      password: 'Ngimdock1@danmail',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  });

  test('Create', async () => {
    expect(true).toBeTruthy();
  });
});
