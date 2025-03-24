package br.alertarisk.mappers;

import br.alertarisk.controllers.request.postagem.UpdatePostagemRequest;
import br.alertarisk.controllers.response.endereco.UpdateEnderecoResponse;
import br.alertarisk.controllers.response.postagem.ListPostagemResponse;
import br.alertarisk.controllers.response.postagem.PostagemDetailResponse;
import br.alertarisk.controllers.response.postagem.SavePostagemResponse;
import br.alertarisk.controllers.response.postagem.UpdatePostagemResponse;
import br.alertarisk.models.Postagem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface PostagemMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "media",ignore = true)
    @Mapping(target = "updatedAt",ignore = true)
    Postagem toModel(final Postagem postagem);

    SavePostagemResponse toSaveResponse(final Postagem postagem);

    Postagem toModel(final Long id, final UpdatePostagemRequest request);

    UpdatePostagemResponse toUpdateResponse(final Postagem postagem);

    PostagemDetailResponse toDetailResponse(final Postagem postagem);

    List<ListPostagemResponse> toListResponse(final List<Postagem> postagens);
}

