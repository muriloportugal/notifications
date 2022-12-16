import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './erros/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('sould be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    //Para testar a leitura, antes de ler vamos precisar criar uma notificação.
    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existent notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    //Aqui como estamos esperando que o método de ler uma notificação falhe,
    //então colocamos o método de ler a notificação dentro do "expect" e usamos o rejects.toThrow()
    //para avisar que esperando que essa promise rejeite (pois o retorno do método é uma promise) e retorna
    //um erro do tipo NotificationNotFound
    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
