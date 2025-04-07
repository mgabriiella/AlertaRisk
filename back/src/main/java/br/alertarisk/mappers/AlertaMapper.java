package br.alertarisk.mappers;

import br.alertarisk.controllers.request.alerta.SaveAlertaRequest;
import br.alertarisk.controllers.request.alerta.UpdateAlertaRequest;
import br.alertarisk.controllers.response.alerta.DetailAlertaResponse;
import br.alertarisk.controllers.response.alerta.ListAlertaResponse;
import br.alertarisk.controllers.response.alerta.SaveAlertaResponse;
import br.alertarisk.controllers.response.alerta.UpdateAlertaResponse;
import br.alertarisk.models.Alerta;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface AlertaMapper {

    // Map SaveAlertaRequest to Alerta entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "endereco.bairro", source = "bairro")
    @Mapping(target = "latitude", source = "latitude")
    @Mapping(target = "longitude", source = "longitude")
    @Mapping(target = "rainVolume", source = "rainVolume")
    @Mapping(target = "descricao", source = "descricao")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "nivel", source = "nivel")
    Alerta toModel(SaveAlertaRequest request);

    // Map UpdateAlertaRequest to Alerta entity
    @Mapping(target = "id", source = "id")
    @Mapping(target = "endereco.bairro", source = "request.bairro")
    @Mapping(target = "latitude", source = "request.latitude")
    @Mapping(target = "longitude", source = "request.longitude")
    @Mapping(target = "rainVolume", source = "request.rainVolume")
    @Mapping(target = "descricao", source = "request.descricao")
    @Mapping(target = "nivel", source = "request.nivel")
    Alerta toModel(Long id, UpdateAlertaRequest request);

    // Map Alerta entity to SaveAlertaResponse
    @Mapping(target = "bairro", source = "endereco.bairro")
    @Mapping(target = "cidade", source = "endereco.cidade")
    @Mapping(target = "estado", source = "endereco.estado")
    SaveAlertaResponse toSaveResponse(Alerta alerta);

    // Map Alerta entity to UpdateAlertaResponse
    @Mapping(target = "bairro", source = "endereco.bairro")
    @Mapping(target = "cidade", source = "endereco.cidade")
    @Mapping(target = "estado", source = "endereco.estado")
    UpdateAlertaResponse toUpdateResponse(Alerta alerta);

    // Map Alerta entity to DetailAlertaResponse
    @Mapping(target = "bairro", source = "endereco.bairro")
    @Mapping(target = "cidade", source = "endereco.cidade")
    @Mapping(target = "estado", source = "endereco.estado")
    DetailAlertaResponse toDetailResponse(Alerta alerta);

    // Map list of Alerta entities to list of ListAlertaResponse
    @Mapping(target = "bairro", source = "endereco.bairro")
    @Mapping(target = "cidade", source = "endereco.cidade")
    @Mapping(target = "estado", source = "endereco.estado")
    ListAlertaResponse toListResponse(Alerta alerta);

    // Map list of Alerta entities to list of ListAlertaResponse
    List<ListAlertaResponse> toListResponse(List<Alerta> alertas);
}