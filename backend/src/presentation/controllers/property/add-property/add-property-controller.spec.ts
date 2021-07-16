import {
  AddProperty,
  AddPropertyModel,
  HttpRequest,
  Validation,
} from './add-property-controller-protocols';

import AddPropertyController from './add-property-controller';
import { badRequest } from '../../../helpers/http-helper';

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      publication_date: 'any_publication_date',
      title: 'any_title',
      description: 'any_description',
      value: 'any_value',
      area: 'any_area',
      address: 'any_address',
      public_place: 'any_public_place',
      number: 'any_number',
      adjunct: 'any_adjunct',
      neighborhood: 'any_neighborhood',
      zip_code: 'any_zip_code',
      city: 'any_city',
      state: 'any_state',
    },
  };
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeAddProperty = (): AddProperty => {
  class AddPropertyStub implements AddProperty {
    async add(data: AddPropertyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new AddPropertyStub();
};

interface SutTypes {
  sut: AddPropertyController;
  validationStub: Validation;
  addPropertyStub: AddProperty;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const addPropertyStub = makeAddProperty();
  const sut = new AddPropertyController(validationStub, addPropertyStub);
  return {
    sut,
    validationStub,
    addPropertyStub,
  };
};

describe('AddProperty Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('Should call AddProperty with correct values', async () => {
    const { sut, addPropertyStub } = makeSut();
    const addSpy = jest.spyOn(addPropertyStub, 'add');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
