package br.alertarisk.mappers;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.controllers.request.endereco.UpdateEnderecoRequest;
import br.alertarisk.controllers.response.endereco.EnderecoDetailResponse;
import br.alertarisk.controllers.response.endereco.ListEnderecoResponse;
import br.alertarisk.controllers.response.endereco.SaveEnderecoResponse;
import br.alertarisk.controllers.response.endereco.UpdateEnderecoResponse;
import br.alertarisk.models.Endereco;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface EnderecoMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "posts",ignore = true)
    @Mapping(target = "cep", source = "cep")
    Endereco toModel( final SaveEnderecoRequest request);

    SaveEnderecoResponse toSaveResponse(final Endereco endereco);

    @Mapping(target = "posts",ignore = true)
    @Mapping(target = "user",ignore = true)
    Endereco toModel(final Long id,final UpdateEnderecoRequest request);

    UpdateEnderecoResponse toUpdateResponse(final Endereco endereco);

    EnderecoDetailResponse toDetailResponse(final Endereco endereco);

    List<ListEnderecoResponse> toListResponse(final List<Endereco> enderecos);

}
