package br.alertarisk.mappers;

import br.alertarisk.controllers.request.SaveUserRequest;
import br.alertarisk.controllers.request.UpdateUserRequest;
import br.alertarisk.controllers.response.ListUserResponse;
import br.alertarisk.controllers.response.SaveUserResponse;
import br.alertarisk.controllers.response.UpdateUserResponse;
import br.alertarisk.controllers.response.UserDetailResponse;
import br.alertarisk.models.UserModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.UUID;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password",ignore = true)
    @Mapping(target = "cpf", ignore = true)
    @Mapping(target = "posts", ignore = true)
    UserModel toModel(final SaveUserRequest request);

    SaveUserResponse toSaveResponse(final UserModel user);

    @Mapping(target = "password",ignore = true)
    @Mapping(target = "cpf", ignore = true)
    UserModel toModel(final UUID id, final UpdateUserRequest request);

    UpdateUserResponse toUpdateResponse(final UserModel user);

    UserDetailResponse toDetailResponse(final UserModel user);

    List<ListUserResponse> toListResponse(final List<UserModel> users);
}
