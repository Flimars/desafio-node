import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ClienteService } from 'App/Services/ClienteService'
import { IViewPaginationMeta } from 'App/Interfaces/IViewPaginationMeta'

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default class ClientesController {
  public async index({ view, request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const limit = 4
    const { data: clientes, meta } = await new ClienteService().paginate(page, limit)
    
    const viewMeta: IViewPaginationMeta = {
      ...meta,
      first_page: 1,
      first_page_url: `/clientes?page=1`,
      last_page_url: `/clientes?page=${meta.last_page}`,
      next_page_url: page < meta.last_page ? `/clientes?page=${page + 1}` : null,
      previous_page_url: page > 1 ? `/clientes?page=${page - 1}` : null
    }
    
    return view.render('clientes/index', { 
      clientes,
      meta: viewMeta,
      title: 'Clientes',
      range
    })
  }

  public async show({ view, params }: HttpContextContract) {
    const cliente = await new ClienteService().findById(params.id)
    
    if (!cliente) {
      return view.render('errors/not-found', {
        title: 'Cliente não encontrado'
      })
    }

    return view.render('clientes/show', {
      cliente,
      title: `Cliente - ${cliente.nome}`
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await new ClienteService().delete(params.id)
      return response.redirect().toRoute('clientes.index')
    } catch (error) {
      return response.redirect().back()
    }
  }
}