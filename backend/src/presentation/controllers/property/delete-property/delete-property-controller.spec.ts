import { DeleteProperty, PropertyModel } from './delete-property-controller-protocols';

import MockDate from 'mockdate';
import { noContent, notFound, ok, serverError } from '../../../helpers/http-helper';
import { DeletePropertyController } from './delete-property-controller';

const makeFakeProperty = (): PropertyModel => {
  return {
    _id: 'any_id',
    publication_date: new Date(),
    title: 'any_title',
    description: 'any_description',
    value: 0,
    area: 'any_area',
    address: 'any_address',
    public_place: 'any_public_place',
    number: 'any_number',
    adjunct: 'any_adjunct',
    neighborhood: 'any_neighborhood',
    zip_code: 'any_zip_code',
    city: 'any_city',
    state: 'any_state',
  };
};

interface SutTypes {
  sut: DeletePropertyController;
  deletePropertyStub: DeleteProperty;
}

const makeDeleteProperty = (): DeleteProperty => {
  class DeletePropertyStub implements DeleteProperty {
    async delete(id: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new DeletePropertyStub();
};

const makeSut = (): SutTypes => {
  const deletePropertyStub = makeDeleteProperty();
  const sut = new DeletePropertyController(deletePropertyStub);
  return {
    sut,
    deletePropertyStub,
  };
};

describe('DeleteProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should return 204 on success', async () => {
    const { sut, deletePropertyStub } = makeSut();
    const httpRequest = {
      params: { id: 'any_id' },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(noContent());
  });
});