package br.alertarisk.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.HttpStatus;

import br.alertarisk.mappers.PostagemMapper;
import br.alertarisk.services.PostagemService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("postagens")
@AllArgsConstructor
public class PostagemController {

	private final PostagemService postagemService;
	private final PostagemMapper postagemMapper;
	
	@GetMapping
	public List<ListPostagemResponse> list() {
		var postagens = postagemService.list();
		return postagemMapper.toListResponse(postagens);
	}
	
	@GetMapping("{id}")
	public PostagemDetailResponse findById(@PathVariable Long id) {
		var postagem = postagemService.findById(id);
		return postagemMapper.toDetailResponse(postagem);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public SavePostagemResponse save(@RequestBody @Valid SavePostagemRequest request) {
		var postagem = postagemMapper.toModel(request);
		postagemService.save(postagem);
		return postagemMapper.toSaveResponse(postagem);
	}
	
	@PutMapping("{id}")
	public UpdatePostagemResponse update(@PathVariable Long id, @RequestBody UpdatePostagemRequest request) {
		var postagem = postagemMapper.toModel(id, request);
		postagemService.update(postagem);
		return postagemMapper.toUpdateResponse(postagem);
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		postagemService.delete(id);
	}
}
